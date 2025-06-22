import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { EcoeStudentEntityOrm } from "../persistence/typeorm/entities/ecoe-student.entity.orm";
import { StudentCompetencyMapper } from "./student-competency.mapper";
import { EcoeStudentResponseDto } from "../dtos/ecoe-student-response.dto";
import { EcoeMapper } from "./ecoe.mapper";


export class EcoeStudentMapper {
    static toDomain(entity: EcoeStudentEntityOrm): EcoeStudent {
        console.log('[LOG] EcoeStudentEntityOrm.competenciesEvaluated:', entity.competenciesEvaluated);
        return new EcoeStudent(
            entity.id,
            entity.studentId,
            EcoeMapper.toDomain(entity.ecoe),
            entity.competenciesEvaluated?.map(StudentCompetencyMapper.toDomain) ?? []
        );
    }

    static toEntity(domain: EcoeStudent): EcoeStudentEntityOrm {
        return {
            id: domain.id,
            studentId: domain.studentId,
            ecoe: EcoeMapper.toEntity(domain.ecoe),
            competenciesEvaluated: domain.competenciesEvaluated.map(
                StudentCompetencyMapper.toEntity
            ),
        };
    }

    // ver como calcular promedio yeso
    static toResponseDto(domain: EcoeStudent): EcoeStudentResponseDto {
        console.log('[LOG] Mapper recibe dominio:', domain);
        return {
            id: domain.id,
            studentId: domain.studentId,
            ecoeId: domain.ecoe.id,
            //competenciesEvaluatedIds: domain.competenciesEvaluated.map(c => c.id),
            competenciesEvaluated: domain.competenciesEvaluated.map(StudentCompetencyMapper.toResponseDto),
            finalGrade: domain.finalGrade,
        };
    }
}
