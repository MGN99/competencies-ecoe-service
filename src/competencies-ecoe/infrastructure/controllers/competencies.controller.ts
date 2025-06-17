import { Controller, Get } from "@nestjs/common";
import { GetCompetenciesUseCase } from "src/competencies-ecoe/application/use-cases/get-competencies.use-case";


@Controller('/api/v1/competencies')
export class CompetenciesController {
    constructor(
        private readonly getCompetenciesUseCase: GetCompetenciesUseCase
    ) { }


    @Get()
    async getCompetencies() {
        try {
            const competencies = await this.getCompetenciesUseCase.execute();
            return competencies;
        }
        catch (error) {
            throw error;
        }
    }
}