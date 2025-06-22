import { Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { EcoeStudentEntityOrm } from "../entities/ecoe-student.entity.orm";
import { InjectRepository } from "@nestjs/typeorm";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { Repository } from "typeorm";
import { EcoeStudentMapper } from "src/competencies-ecoe/infrastructure/mappers/ecoe-student.mapper";
import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { EcoeIdYearDto } from "src/competencies-ecoe/application/dtos/ecoe-id-yearSemester-by-student-id.dto";

@Injectable()
export class EcoeStudentRepositoryImpl implements IEcoeStudentRepositoryOutPort {
    constructor(
        @InjectRepository(EcoeStudentEntityOrm)
        private readonly ormRepo: Repository<EcoeStudentEntityOrm>,
    ) {}

    async findByStudentYear(studentId: string, year: number): Promise<EcoeStudent[] | null> {
        const entities = await this.ormRepo.find({
            where: {
                studentId,
                ecoe: { year },
            },
            relations: [
                'ecoe',
                'competenciesEvaluated',
                'competenciesEvaluated.competency'
            ],
        });

        return entities.length > 0 ? entities.map(EcoeStudentMapper.toDomain) : [];
    }

    async findEcoeIdsAndYearsByStudentId(studentId: string): Promise<{ ecoeId: number, yearSemester: string }[]> {
    const ecoeStudents = await this.ormRepo.find({
        where: { studentId },
        relations: ['ecoe'],
        select: ['id', 'ecoe'],
    });

    // Devuelve pares únicos ecoeId-year
    const result: EcoeIdYearDto[] = [];
    const seen = new Set<string>();
    for (const es of ecoeStudents) {
        if (es.ecoe) {
            const key = `${es.ecoe.id}-${es.ecoe.year}-${es.ecoe.semester}`;
            if (!seen.has(key)) {
                const dto = new EcoeIdYearDto();
                dto.ecoeId = es.ecoe.id;
                dto.yearSemester = `${es.ecoe.year}-${es.ecoe.semester}`;
                result.push(dto);
                seen.add(key);
            }
        }
    }
    return result;
    }

    async save(ecoe: Ecoe, studentId: string): Promise<void> {
        const newEntity = this.ormRepo.create({
            studentId,
            ecoe,
        });

        await this.ormRepo.save(newEntity);
    }



    /*
    async existsStudentInEcoeYearSemester(
        studentId: string,
        year: number,
        semester: number
    ): Promise<boolean> {
        const count = await this.ormRepo.count({
            where: {
                studentId,
                ecoe: { year, semester },
            },
        });

        return count > 0;
    }
        */

    async findByStudentIdAndEcoeId(studentId: string, ecoeId: number): Promise<EcoeStudent | null> {
        const ecoeStudent = await this.ormRepo.findOne({
            where: {
                studentId,
                ecoe: { id: ecoeId },
            },
            relations: ['ecoe', 'competenciesEvaluated', 'competenciesEvaluated.competency'],
        });

        return ecoeStudent ? EcoeStudentMapper.toDomain(ecoeStudent) : null;
    }

    async findStudentsByEcoeId(id: number): Promise<EcoeStudent[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { ecoe: { id } },
            relations: ['ecoe', 'competenciesEvaluated', 'competenciesEvaluated.competency'],
        });

        return ecoeStudents.map(EcoeStudentMapper.toDomain);
    }
}
