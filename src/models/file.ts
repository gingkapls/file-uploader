import {
    FileWhereUniqueInput,
} from "../generated/prisma/models.js";
import { getAllChildren } from "../generated/prisma/sql.js";
import { db } from "../utils/db.js";

interface FileCreateArgs {
    name: string;
    ownerId: number;
    parentId?: string;
}

interface FileSelectArgs {
    parentId: string | null;
    ownerId: number;
}

export class File {
    static #db = db.file;

    // Getters
    static async getFileById({ id }: FileWhereUniqueInput) {
        return this.#db.findUnique({ where: { id } });
    }

    static async getChildrenByParentId({ parentId, ownerId }: FileSelectArgs) {
        return this.#db.findMany({ where: { parentId, ownerId } });
    }

    static async getAllChildrenByParentId({ parentId, ownerId }: FileSelectArgs) {
        return db.$queryRawTyped(getAllChildren(parentId, ownerId))
    }

    static async getFileMimeType({ id }: FileWhereUniqueInput) {
        return this.#db.findUnique({ select: { type: true }, where: { id } });
    }

    // Folders
    static async createFolder({
        name,
        parentId,
        ownerId,
    }: FileCreateArgs) {
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
        return this.#db.create({
            data: { name, type: "FILE", ownerId, parentId },
        });
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

    static async deleteFilesById({
        ids,
        ownerId,
    }: {
        ids: string[];
        ownerId: number;
    }) {
        return this.#db.deleteMany({ where: { id: { in: ids }, ownerId } });
    }
}
