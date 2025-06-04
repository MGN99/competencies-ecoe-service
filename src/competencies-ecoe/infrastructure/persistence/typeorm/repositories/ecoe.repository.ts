import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcoeRepositoryOutPort } from '../../../../domain/repositories/ecoe.repository.out.port';
import { Ecoe } from 'src/competencies-ecoe/domain/models/ecoe.entity';
import { EcoeEntityOrm } from '../entities/ecoe.entity.orm';

@Injectable()
export class EcoeRepository implements EcoeRepositoryOutPort {
  constructor(
    @InjectRepository(EcoeEntityOrm)
    private readonly repo: Repository<Ecoe>,
  ) {}

  async findAvailable(): Promise<Pick<Ecoe, 'id' | 'semester' | 'description'>[]> {
    return this.repo.find({
      select: ['id', 'semester', 'description'],
      // Puedes agregar condiciones en where si necesitas filtrar los ecoes disponibles
    });
  }
}