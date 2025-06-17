import { Competency } from 'src/competencies-ecoe/domain/models/competency.entity';
import { CompetencyEntityOrm } from '../persistence/typeorm/entities/competency.entity.orm';

export class CompetencyMapper {
  static toDomain(entity: CompetencyEntityOrm): Competency {
    return new Competency(
      entity.id,
      entity.name,
      entity.description,
    );
  }

  static toEntity(domain: Competency): CompetencyEntityOrm {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
    };
  }
}