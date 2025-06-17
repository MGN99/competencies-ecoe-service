import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";
import { StudentCompetencyEntityOrm } from "../persistence/typeorm/entities/student-competency.entity.orm";
import { EcoeStudentMapper } from "./ecoe-student.mapper";
import { CompetencyMapper } from "./competency.mapper";

export class StudentCompetencyMapper {
  static toDomain(entity: StudentCompetencyEntityOrm): StudentCompetency {

    return new StudentCompetency(
      entity.id,
      entity.grade,
      entity.levelAchievement,
      EcoeStudentMapper.toDomain(entity.ecoeStudent),
      //LevelsCompetencyMapper.toDomain(entity.levelCompetency),
      CompetencyMapper.toDomain(entity.competency),
    );
  }

  static toEntity(domain: StudentCompetency): StudentCompetencyEntityOrm {
    return {
      id: domain.id,
      grade: domain.grade,
      levelAchievement: domain.levelAchievement,
      ecoeStudent: EcoeStudentMapper.toEntity(domain.ecoeStudent),
      competency: CompetencyMapper.toEntity(domain.competency),
    };
  }
}
