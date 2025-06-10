import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { EcoeStudentEntityOrm } from "../persistence/typeorm/entities/ecoe-student.entity.orm";
import { StudentCompetencyMapper } from "./student-competency.mapper";
import { EcoeStudentResponseDto } from "../dtos/ecoe-student-response.dto";
import { EcoeInstanceMapper } from "./ecoe-instance.mapper";


export class EcoeStudentMapper {
    static toDomain(entity: EcoeStudentEntityOrm): EcoeStudent {
        return new EcoeStudent(
            entity.id,
            entity.studentId,
            EcoeInstanceMapper.toDomain(entity.ecoeInstance),
            entity.finalNote,
            entity.finalArchievementLevel,
            entity.competenciesEvaluated?.map(StudentCompetencyMapper.toDomain) ?? []
        );
    }

    static toResponseDto(domain: EcoeStudent): EcoeStudentResponseDto {
        return {
            id: domain.id,
            studentId: domain.studentId,
            ecoeInstanceId: domain.ecoeInstance.id,
            competencyEvaluatedIds: domain.levelCompetenciesEvaluated.map(
                (c) => c.id
            ),
        };
    }
}
