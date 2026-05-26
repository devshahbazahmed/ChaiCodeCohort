import bcrypt from "bcryptjs";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import {
  createUserWithEmailAndPassword,
  generateUserTokenPayload,
  type GenerateUserTokenPayload,
  type CreateUserWithEmailAndPassword,
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
}
