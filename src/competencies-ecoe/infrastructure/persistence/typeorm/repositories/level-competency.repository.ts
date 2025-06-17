import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ILevelCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/level-competency.repository.out.port';
import { LevelCompetencyEntityOrm } from '../entities/level-competency.entity.orm';
import { LevelCompetency } from 'src/competencies-ecoe/domain/models/level-competency.entity';
import { LevelsCompetencyMapper } from 'src/competencies-ecoe/infrastructure/mappers/levels-competency.mapper';


@Injectable()
export class LevelCompetencyRepository implements ILevelCompetencyRepositoryOutPort {
    constructor(
        @InjectRepository(LevelCompetencyEntityOrm)
        private readonly repo: Repository<LevelCompetencyEntityOrm>,
    ) {}

    async save(levelCompetency: LevelCompetency): Promise<LevelCompetency> {
        const entity = LevelsCompetencyMapper.toEntity(levelCompetency);
        const savedEntity = await this.repo.save(entity);
        return LevelsCompetencyMapper.toDomain(savedEntity);
    }

    async findOneById(id: number): Promise<LevelCompetency | null> {
        const entity = await this.repo.findOne({
            where: { id },
            relations: ['competency'],
        });

        if (!entity) {
            return null;
        }
        
        return LevelsCompetencyMapper.toDomain(entity);
    }

    async findManyByIds(ids: number[]): Promise<LevelCompetency[]> {
        const entities = await this.repo.find({
            where: { id: In(ids) },
            relations: ['competency'],
        });

        return LevelsCompetencyMapper.toDomainList(entities);
    }

    async findByCompetencyId(competencyId: number): Promise<LevelCompetency[]> {
        const entities = await this.repo.find({
            where: { competency: { id: competencyId } },
            relations: ['competency'],
        });

        return LevelsCompetencyMapper.toDomainList(entities);
    }
}