// In Memory DB

// HashMap(key, value)

type UserID = string;

interface User {
  id: UserID;
  fname: string;
  lname?: string;
  email: string;
  contact: {
    mobile: string;
  };
  address: {
    street: number;
    pincode: number;
    country: string;
  };
}

class InMemoryDB {
  private _db: Map<UserID, User>;
  constructor() {}

  public insertUser(data: User): UserID {
    if (this._db.has(data.id)) {
      throw new Error(`User with ID ${data.id} already exists`);
    }
    this._db.set(data.id, data);
    return data.id;
  }

  public updateUser(id: UserID, updateData: Omit<User, "id">): boolean {
    if (!this._db.has(id))
      throw new Error(`User with ID ${id} does not exists`);
    this._db.set(id, { ...updateData, id });
    return true;
  }

  public getUserByID(id: UserID): User {
    if (this._db.has(id)) throw new Error(`User with ID ${id} does not exists`);
    return this._db.get(id)!;
  }
}

const mydb = new InMemoryDB();
mydb.insertUser({
  id: "1",
  fname: "Piyush",
  lname: "Garg",
  email: "piyushgarg@gmail.com",
  contact: {
    mobile: "99999",
  },
  address: {
    street: 42,
    pincode: 101010,
    country: "USA",
  },
});
