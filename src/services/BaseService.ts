import prisma from "../config/DataBase.Config";
type ModelName = keyof typeof prisma;

export class BaseCrudService<T> {
    private model: any;

    constructor(modelName: ModelName) {
        this.model = (prisma as any)[modelName];
        if (!this.model) {
            throw new Error(`Model ${String(modelName)} not found in prisma client`);
        }
    }

    async create(data: any, select?: any): Promise<T> {
        return this.model.create({ data, select });
    }

    async findAll(where?: any, select?: any): Promise<T[]> {
        return this.model.findMany({ where, select });
    }

    async findById(idField: string, id: number, select?: any): Promise<T | null> {
        return this.model.findUnique({
            where: { [idField]: id },
            select,
        });
    }

    async update(idField: string, id: number, data: any, select?: any): Promise<T> {
        return this.model.update({
            where: { [idField]: id },
            data,
            select,
        });
    }

    async delete(idField: string, id: number): Promise<T> {
        return this.model.delete({
            where: { [idField]: id },
        });
    }
}
