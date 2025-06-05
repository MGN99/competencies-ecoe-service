import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEcoeRepositoryOutPort } from '../../../../domain/repositories/ecoe.repository.out.port';
import { Ecoe } from 'src/competencies-ecoe/domain/models/ecoe.entity';
import { EcoeEntityOrm } from '../entities/ecoe.entity.orm';
import { EcoeMapper } from 'src/competencies-ecoe/infrastructure/mappers/ecoe.mapper';

@Injectable()
export class EcoeRepository implements IEcoeRepositoryOutPort {
    constructor(
        @InjectRepository(EcoeEntityOrm)
        private readonly repo: Repository<EcoeEntityOrm>,
    ) {}

    async findAvailable(): Promise<Pick<Ecoe, 'id' | 'semester' | 'description'>[]> {
        const entities = await this.repo.find({
            select: ['id', 'semester', 'description'],
        });
        return entities.map(EcoeMapper.toDomainPartial);
    }

    async findById(id: number): Promise<Ecoe | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? EcoeMapper.toDomain(entity) : null;
    }
}