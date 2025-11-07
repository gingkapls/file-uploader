import { DefaultArgs } from "@prisma/client/runtime/library.js";
import { PrismaClient } from "../generated/prisma/client.js";
import {
  UserCreateArgs,
  UserUpdateArgs,
  UserWhereUniqueInput,
} from "../generated/prisma/models.js";

type UserIdRecord = Record<"id", UserWhereUniqueInput>;
type UserUpdateByIdArgs = UserIdRecord & UserUpdateArgs;
type UsernameRecord = Record<"username", UserWhereUniqueInput>;
type UserUpdateByUsernameArgs = UsernameRecord & UserUpdateArgs;

export class User {
  static #prisma = new PrismaClient();

  static async findById(id: UserWhereUniqueInput) {
    return this.#prisma.user.findUnique({ where: id });
  }

  static async findByUsername(username: UserWhereUniqueInput) {
    return this.#prisma.user.findUnique({ where: username });
  }

  static async create(props: UserCreateArgs<DefaultArgs>) {
    return this.#prisma.user.create(props);
  }

  static async deleteById(id: UserWhereUniqueInput) {
    return this.#prisma.user.delete({ where: id });
  }

  static async deleteByUsername(username: UserWhereUniqueInput) {
    return this.#prisma.user.delete({ where: username });
  }

  static async updateById({ id, ...data }: UserUpdateByIdArgs) {
    return this.#prisma.user.update({ where: id, data });
  }

  static async updateByUsername({ username, ...data }: UserUpdateByUsernameArgs) {
    return this.#prisma.user.update({ where: username, data });
  }
}
