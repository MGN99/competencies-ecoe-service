import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { EcoeEntityOrm } from "../persistence/typeorm/entities/ecoe.entity.orm";
import { LevelsCompetencyMapper } from "./levels-competency.mapper";
import { EcoeStudentMapper } from "./ecoe-student.mapper";

export class EcoeMapper {
    static toDomain(entity: EcoeEntityOrm): Ecoe {
        return {
            id: entity.id,
            name: entity.name,
            cycle: entity.cycle,
            semester: entity.semester,
            year: entity.year,
            description: entity.description,
            students: entity.students ? entity.students.map(s => EcoeStudentMapper.toDomain(s)) : [],
        };
    }

    static toEntity(domain: Ecoe): EcoeEntityOrm {
        return {
            id: domain.id,
            name: domain.name,
            cycle: domain.cycle,
            semester: domain.semester,
            year: domain.year,
            description: domain.description,
            students: domain.students ? domain.students.map(s => EcoeStudentMapper.toEntity(s)) : [],
        };
    }
}