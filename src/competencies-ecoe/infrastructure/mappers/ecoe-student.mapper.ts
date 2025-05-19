// EcoeStudentMapper.ts

import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { EcoeStudentEntityOrm } from "../persistence/typeorm/entities/ecoe-student.entity.orm";
import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { StudentCompetencyMapper } from "./student-competency.mapper";


export class EcoeStudentMapper {
  static toDomain(entity: EcoeStudentEntityOrm): EcoeStudent {
    return new EcoeStudent(
      entity.id,
      entity.student_id,
      new Ecoe(
        entity.ecoe.id,
        entity.ecoe.semester,
        entity.ecoe.description
      ),
      entity.final_note,
      entity.final_achievement_level,
      entity.competenciesEvaluated?.map(StudentCompetencyMapper.toDomain) ?? []
    );
  }
}
