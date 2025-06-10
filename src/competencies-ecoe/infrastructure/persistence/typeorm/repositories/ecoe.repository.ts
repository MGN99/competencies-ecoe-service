import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEcoeRepositoryOutPort } from '../../../../domain/repositories/ecoe.repository.out.port';
import { Ecoe } from 'src/competencies-ecoe/domain/models/ecoe.entity';
import { EcoeEntityOrm } from '../entities/ecoe.entity.orm';
import { EcoeMapper } from 'src/competencies-ecoe/infrastructure/mappers/ecoe.mapper';
import { EcoeInstance } from 'src/competencies-ecoe/domain/models/ecoe_instance.entity';
import { EcoeInstanceEntityOrm } from '../entities/ecoe-instance.entity.orm';
import { EcoeInstanceMapper } from 'src/competencies-ecoe/infrastructure/mappers/ecoe-instance.mapper';
import { EcoeNotFoundError } from 'src/competencies-ecoe/domain/errors/ecoe-not-found.error';

@Injectable()
export class EcoeRepository implements IEcoeRepositoryOutPort {
    constructor(
        @InjectRepository(EcoeEntityOrm)
        private readonly repo: Repository<EcoeEntityOrm>,
        @InjectRepository(EcoeInstanceEntityOrm)
        private readonly ecoeInstanceRepo: Repository<EcoeInstanceEntityOrm>,
    ) { }

    async findAll(): Promise<Ecoe[]> {
        const entities = await this.repo.find();
        return entities.map(EcoeMapper.toDomain);
    }

    async findById(id: number): Promise<Ecoe | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? EcoeMapper.toDomain(entity) : null;
    }

    async findInstancesByEcoeId(ecoeId: number,): Promise<EcoeInstance[]> {
        const instances = await this.ecoeInstanceRepo.find({
            where: { ecoe: { id: ecoeId } },
        });
        return instances.map(EcoeInstanceMapper.toDomain);
    }

    async createEcoeInstance(
        ecoeId: number,
        year: number,
        semester: number,
        description: string,
    ): Promise<EcoeInstance> {
        const ecoe = await this.repo.findOne({ where: { id: ecoeId } });
        if (!ecoe) throw new EcoeNotFoundError(ecoeId);

        const newInstance = this.ecoeInstanceRepo.create({
            description,
            semester,
            year,
            ecoe,
        });

        const saved = await this.ecoeInstanceRepo.save(newInstance);
        return EcoeInstanceMapper.toDomain(saved);
    }


    /*
    async findAvailable(): Promise<Pick<Ecoe, 'id' | 'semester' | 'description'>[]> {
        const entities = await this.repo.find({
            select: ['id', 'semester', 'description'],
        });
        return entities.map(EcoeMapper.toDomainPartial);
    }
        */
}