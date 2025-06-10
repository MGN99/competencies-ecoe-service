import { StudentLevelCompetency } from "src/competencies-ecoe/domain/models/student-level-competency.entity";
import { StudentCompetencyEntityOrm } from "../persistence/typeorm/entities/student-competency.entity.orm";
import { Competency } from "src/competencies-ecoe/domain/models/competency.entity";
import { EcoeStudentMapper } from "./ecoe-student.mapper";
import { LevelsCompetencyMapper } from "./levels-competency.mapper";

export class StudentCompetencyMapper {
  static toDomain(entity: StudentCompetencyEntityOrm): StudentLevelCompetency {

    return new StudentLevelCompetency(
      entity.id,
      entity.grade,
      entity.levelAchievement,
      EcoeStudentMapper.toDomain(entity.ecoeStudent),
      LevelsCompetencyMapper.toDomain(entity.levelCompetency),
    );
  }
}
