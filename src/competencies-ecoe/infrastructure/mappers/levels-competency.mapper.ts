import { LevelCompetency } from 'src/competencies-ecoe/domain/models/level-competency.entity';
import { LevelCompetencyEntityOrm } from '../persistence/typeorm/entities/level-competency.entity.orm';
import { Competency } from 'src/competencies-ecoe/domain/models/competency.entity';

export class LevelsCompetencyMapper {
  static toDomain(entity: LevelCompetencyEntityOrm): LevelCompetency {
    return new LevelCompetency(
      entity.id,
      new Competency(
        entity.competency.id,
        entity.competency.name,
        entity.competency.description
      ),
      entity.level,
      entity.descriptor
    );
  }

  static toDomainList(entities: LevelCompetencyEntityOrm[]): LevelCompetency[] {
    return entities.map(this.toDomain);
  }
}
