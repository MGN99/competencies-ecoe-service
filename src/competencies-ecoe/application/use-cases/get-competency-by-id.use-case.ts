import { Inject, Injectable } from '@nestjs/common';
import { Competency } from 'src/competencies-ecoe/domain/models/competency.entity';
import { ICompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/competency.repository.out.port';


@Injectable()
export class GetCompetencyByIdUseCase {
    constructor(
        @Inject('ICompetencyRepositoryOutPort')
        private readonly competencyRepository: ICompetencyRepositoryOutPort
    ) {}

    async execute(id: number): Promise<Competency | null> {
        return this.competencyRepository.findById(id);
    }
}