import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";
import { StudentCompetencyEntityOrm } from "../persistence/typeorm/entities/student-competency.entity.orm";
import { EcoeStudentMapper } from "./ecoe-student.mapper";
import { CompetencyMapper } from "./competency.mapper";
import { get } from "http";
import { getAchievementLevel } from "src/competencies-ecoe/domain/utils/achievement-level.util";

export class StudentCompetencyMapper {
  static toDomain(entity: StudentCompetencyEntityOrm): StudentCompetency {
    if(!entity.competency) {
      console.error('[ERROR] StudentCompetencyMapper.toDomain: competency is null or undefined', entity);
      throw new Error('StudentCompetencyEntityOrm.competency es undefined');
    }
    return new StudentCompetency(
      entity.grade,
      //EcoeStudentMapper.toDomain(entity.ecoeStudent),
      undefined,
      //LevelsCompetencyMapper.toDomain(entity.levelCompetency),
      CompetencyMapper.toDomain(entity.competency),
      entity.id,
    );
  }

  static toEntity(domain: StudentCompetency): StudentCompetencyEntityOrm {
    return {
      id: domain.id,
      grade: domain.grade,
      ecoeStudent: EcoeStudentMapper.toEntity(domain.ecoeStudent),
      competency: CompetencyMapper.toEntity(domain.competency),
    };
  }

  static toResponseDto(domain: StudentCompetency) {
    return {
      id: domain.id,
      competencyId: domain.competency.id,
      competencyName: domain.competency.name,
      grade: domain.grade,
      achievementLevel: getAchievementLevel(domain.grade),
    }
  }
}