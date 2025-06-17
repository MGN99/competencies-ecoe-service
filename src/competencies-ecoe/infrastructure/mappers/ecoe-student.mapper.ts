import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { EcoeStudentEntityOrm } from "../persistence/typeorm/entities/ecoe-student.entity.orm";
import { StudentCompetencyMapper } from "./student-competency.mapper";
import { EcoeStudentResponseDto } from "../dtos/ecoe-student-response.dto";
import { EcoeMapper } from "./ecoe.mapper";


export class EcoeStudentMapper {
    static toDomain(entity: EcoeStudentEntityOrm): EcoeStudent {
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
            competenciesEvaluated: domain.levelCompetenciesEvaluated.map(
                StudentCompetencyMapper.toEntity
            ),
        };
    }

    // ver como calcular promedio yeso
    static toResponseDto(domain: EcoeStudent): EcoeStudentResponseDto {
        return {
            id: domain.id,
            studentId: domain.studentId,
            ecoeId: domain.ecoe.id,
            levelCompetenciesEvaluatedIds: domain.levelCompetenciesEvaluated.map(c => c.id),
            finalGrade: domain.finalGrade ?? 0,
            finalAchievementLevel: domain.finalAchievementLevel ?? 'N/A',
        };
    }
}
