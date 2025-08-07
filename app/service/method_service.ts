
import { MethodDTO,UpdateMethodDTO , CreateMethodDTO } from "../dto/method_dto.ts";
import { IMethodService } from "./imethod_service.ts";
import { IMethodRepository } from "../repository/imethod_repository.ts";


export class MethodService implements IMethodService {
    private methodRepository: IMethodRepository;

    constructor(methodRepository: IMethodRepository) {
        this.methodRepository = methodRepository;
    }
 

    async create(method: CreateMethodDTO): Promise<MethodDTO> {
        const new_method = await this.methodRepository.create(method);
        return {
            id: new_method.id,
            step: new_method.step,
            step_number: new_method.step_number,
        };
    }

    async get(id: number): Promise<MethodDTO | null> {
        const method = await this.methodRepository.get(id);
        if (!method) {
            return null; // Method not found
        }
        return {
            id: method.id,
            step: method.step,
            step_number: method.step_number,
        };
    }

    async get_all(): Promise<MethodDTO[]>{
        const methods = await this.methodRepository.get_all();
        return methods.map(method => {
            return {
                id: method.id,
                step: method.step,
                step_number: method.step_number,
            }
        });   
    }

    async update(id: number, ingredient: UpdateMethodDTO): Promise<MethodDTO | null> {
        const updatedMethod = await this.methodRepository.update(id, ingredient);
        if (!updatedMethod) {
            return null; // Method not found
        }
        return {
            id: updatedMethod.id,
            step: updatedMethod.step,
            step_number: updatedMethod.step_number,
        };
    }

    async delete(id: number): Promise<boolean> {
        return await this.methodRepository.delete(id);
    }
}