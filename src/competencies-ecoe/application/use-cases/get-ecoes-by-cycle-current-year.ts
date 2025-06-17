import { Inject } from "@nestjs/common";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";
import { EcoeLightDto } from "../dtos/ecoe-light.dto ";

export class GetEcoesByCycleCurrentYearUseCase {
    constructor(
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepository: IEcoeRepositoryOutPort,
    ) { }

    async execute(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<EcoeLightDto[]> {
        const currentYear = new Date().getFullYear();
        const ecoes = await this.ecoeRepository.findByCycleYear(cycle, currentYear);

        return ecoes.map(ecoe => ({
            id: ecoe.id,
            name: ecoe.name,
            cycle: ecoe.cycle,
            year: ecoe.year,
            semester: ecoe.semester,
            description: ecoe.description,
        }));
    }
}