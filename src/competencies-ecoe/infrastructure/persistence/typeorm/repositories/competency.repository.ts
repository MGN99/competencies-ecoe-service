import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/competency.repository.out.port';
import { Competency } from 'src/competencies-ecoe/domain/models/competency.entity';
import { CompetencyEntityOrm } from '../entities/competency.entity.orm';

@Injectable()
export class CompetencyRepository implements ICompetencyRepositoryOutPort {
    constructor(
        @InjectRepository(CompetencyEntityOrm)
        private readonly ormRepo: Repository<CompetencyEntityOrm>,
    ) {}

    async findById(id: number): Promise<Competency | null> {
        const entity = await this.ormRepo.findOne({ where: { id } });
        if (!entity) return null;
        return new Competency(entity.id, entity.name, entity.description);
    }
}