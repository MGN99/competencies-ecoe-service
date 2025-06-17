import { Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { EcoeStudentEntityOrm } from "../entities/ecoe-student.entity.orm";
import { InjectRepository } from "@nestjs/typeorm";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { Repository } from "typeorm";
import { EcoeStudentMapper } from "src/competencies-ecoe/infrastructure/mappers/ecoe-student.mapper";
import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";

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

    async findYearsByStudentId(studentId: string): Promise<number[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { studentId },
            relations: ['ecoe'],
            select: ['ecoe'],
        });

        return ecoeStudents
            .map(r => r.ecoe.year)
            .sort((yearA, yearB) => yearA - yearB);
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
            relations: ['ecoe', 'competenciesEvaluated'],
        });

        return ecoeStudent ? EcoeStudentMapper.toDomain(ecoeStudent) : null;
    }

    async findStudentsByEcoeId(id: number): Promise<EcoeStudent[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { ecoe: { id } },
            relations: ['ecoe', 'competenciesEvaluated', 'competenciesEvaluated.levelCompetency'],
        });

        return ecoeStudents.map(EcoeStudentMapper.toDomain);
    }
}
