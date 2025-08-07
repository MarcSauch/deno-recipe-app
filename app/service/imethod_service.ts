
import { MethodDTO,UpdateMethodDTO , CreateMethodDTO } from "../dto/method_dto.ts";


export class IMethodService {
    async create(method: CreateMethodDTO): Promise<MethodDTO> {
        throw new Error("Method not implemented.");
    }

    async get(id: number): Promise<MethodDTO | null> {
        throw new Error("Method not implemented.");
    }

    async get_all(): Promise<MethodDTO[]>{
        console.log("Method not implemented.");
        throw new Error("Method not implemented.");
    }

    async update(id: number, method: UpdateMethodDTO): Promise<MethodDTO | null> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}