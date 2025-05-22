/*
import { Competency } from 'src/competencies-ecoe/domain/models/competency.entity';
import { CompetencyEntityOrm } from '../persistence/typeorm/entities/competency.entity.orm';
import { LevelsCompetencyEntityOrm } from '../persistence/typeorm/entities/levels-competency.entity.orm';
import { LevelCompetency } from 'src/competencies-ecoe/domain/models/level';

export class CompetencyMapper {
  static toDomain(entity: CompetencyEntityOrm): Competency {
    const levels = (entity.levelsCompetence || []).map(
      (level: LevelsCompetencyEntityOrm) =>
        new LevelCompetency(level.id, level.level, level.descriptor)
    );

    return new Competency(entity.id, entity.name, entity.description, levels);
  }
}
*/