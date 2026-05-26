import bcrypt from "bcryptjs";
import { db, eq, isConfig } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
  createUserWithEmailAndPassword,
  generateUserTokenPayload,
  type GenerateUserTokenPayload,
  type CreateUserWithEmailAndPassword,
  SignInUserWithEmailAndPassword,
  signInUserWithEmailAndPassword,
} from "./model";
import * as JWT from "jsonwebtoken";
import { env } from "../env";

export default class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) return null;
    return result[0];
  }

  private async generateUserToken(payload: GenerateUserTokenPayload) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);
    const token = JWT.sign({ id }, env.JWT_SECRET);
    return { token };
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPassword) {
    // data recieve and validate
    const { fullName, email, password } = await createUserWithEmailAndPassword.parseAsync(payload);
    // check in db for existing email
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) throw new Error("User with this email already exists");
    // hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    // create a new user in db
    const result = await db
      .insert(usersTable)
      .values({
        fullName,
        email,
        passwordHash,
      })
      .returning({
        id: usersTable.id,
      });
    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error("Something went wrong while creating the user");
    // jwt token, we will set it in cookie
    const { token } = await this.generateUserToken({ id: result[0].id });
    // return
    return {
      id: result[0].id,
      token,
    };
  }

  public async signInUserWithEmailAndPassword(payload: SignInUserWithEmailAndPassword) {
    const { email, password } = await signInUserWithEmailAndPassword.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);

    if (!existingUser) {
      throw new Error("User with this email does not exists");
    }

    if (!existingUser.passwordHash) {
      throw new Error("Invalid authentication method");
    }

    const isValid = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isValid) {
      throw new Error("Invalid email address or password");
    }

    const { token } = await this.generateUserToken({ id: existingUser.id });

    return {
      id: existingUser.id,
      token,
    };
  }

  public async getUserInfoById(id: string) {
    const user = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user || user.length === 0) {
      throw new Error("User with this id does not exist");
    }

    return user[0]!;
  }

  public async verifyAndDecodeUserToken(token: string) {
    try {
      const payload = JWT.verify(token, env.JWT_SECRET) as GenerateUserTokenPayload;
      return payload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
