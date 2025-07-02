import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEcoeRepositoryOutPort } from '../../../../domain/repositories/ecoe.repository.out.port';
import { EcoeMapper } from 'src/competencies-ecoe/infrastructure/mappers/ecoe.mapper';
import { Ecoe } from 'src/competencies-ecoe/domain/models/ecoe.entity';
import { EcoeEntityOrm } from '../entities/ecoe.entity.orm';

@Injectable()
export class EcoeRepository implements IEcoeRepositoryOutPort {
    constructor(
        @InjectRepository(EcoeEntityOrm)
        private readonly repo: Repository<EcoeEntityOrm>,
    ) { }

    async findAll(): Promise<Ecoe[]> {
        const entities = await this.repo.find();
        return entities.map(EcoeMapper.toDomain);
    }

    async findOneById(id: number): Promise<Ecoe | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity ? EcoeMapper.toDomain(entity) : null;
    }

    async findOneByCycleSemesterYear(
        cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL', 
        semester: number, 
        year: number): Promise<Ecoe | null> {
        const entity = await this.repo.findOne({ where: { cycle, semester, year } });
        return entity ? EcoeMapper.toDomain(entity) : null;
    }

    async save(ecoe: Ecoe): Promise<Ecoe> {
        const entity = EcoeMapper.toEntity(ecoe);
        const savedEntity = await this.repo.save(entity);
        return EcoeMapper.toDomain(savedEntity);
    }

    async findByCycle(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<Ecoe[]> {
        const entities = await this.repo.find({ where: { cycle } });
        return entities.map(EcoeMapper.toDomain);
    }

    async findByCycleYear(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL', year: number): Promise<Ecoe[]> {
        const entities = await this.repo.find({ where: { cycle, year } });
        return entities.map(EcoeMapper.toDomain);
    }

    async findAllByCycle(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<Ecoe[]> {
        const entities = await this.repo.find({ where: { cycle } });
        return entities.map(EcoeMapper.toDomain);
    }
}