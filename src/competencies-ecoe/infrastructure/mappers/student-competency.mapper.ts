import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";
import { StudentCompetencyEntityOrm } from "../persistence/typeorm/entities/student-competency.entity.orm";
import { Competency } from "src/competencies-ecoe/domain/models/competency.entity";

export class StudentCompetencyMapper {
  static toDomain(entity: StudentCompetencyEntityOrm): StudentCompetency {
    return new StudentCompetency(
      entity.id,
      new Competency(
        entity.competency.id,
        entity.competency.name,
        entity.competency.description
      ),
      entity.grade,
      entity.level_achievement
    );
  }
}
