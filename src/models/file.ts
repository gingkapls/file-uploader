import { FileWhereUniqueInput } from "../generated/prisma/models.js";
import { db } from "../utils/db.js";

interface FileCreateArgs {
  name: string;
  ownerId: number;
  parentId?: string;
}

export class File {
  static #db = db.file;

  // Getters
  static async getFileById({ id }: FileWhereUniqueInput) {
    return this.#db.findUnique({ where: { id } });
  }

  static async getChildrenByParentId({ parentId }: FileWhereUniqueInput) {
    return this.#db.findMany({ where: { parentId } });
  }

  // Folders
  static async createFolder({ name, parentId, ownerId }: FileCreateArgs) {
    return this.#db.create({ data: { name, type: "DIR", ownerId, parentId } });
  }

  static async updateFolderById({
    id,
    ownerId,
    newName,
  }: {
    id: string;
    ownerId: number;
    newName: string;
  }) {
    return this.#db.update({ where: { id, ownerId }, data: { name: newName } });
  }

  // Files
  static async createFile({ name, parentId, ownerId }: FileCreateArgs) {
    return this.#db.create({ data: { name, type: "FILE", ownerId, parentId } });
  }

  static async deleteFileById({
    id,
    ownerId,
  }: {
    id: string;
    ownerId: number;
  }) {
    return this.#db.delete({ where: { id, ownerId } });
  }
}
