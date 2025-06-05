import { Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { EcoeStudentEntityOrm } from "../entities/ecoe-student.entity.orm";
import { InjectRepository } from "@nestjs/typeorm";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { Repository } from "typeorm";
import { EcoeStudentMapper } from "src/competencies-ecoe/infrastructure/mappers/ecoe-student.mapper";

@Injectable()
export class EcoeStudentRepositoryImpl implements IEcoeStudentRepositoryOutPort {
  constructor(
    @InjectRepository(EcoeStudentEntityOrm)
    private readonly ormRepo: Repository<EcoeStudentEntityOrm>,
  ) {}

    async findByStudentIdAndEcoeYear(studentId: string, ecoeYear: number): Promise<EcoeStudent | null> {
        const ormEntity = await this.ormRepo.findOne({
            where: {
                student_id: studentId,
                ecoe_year: ecoeYear,
            },
            relations: ['ecoe', 'competenciesEvaluated', 'competenciesEvaluated.competency'],
        });

        if (!ormEntity) {
            return null;
        }

        return EcoeStudentMapper.toDomain(ormEntity);
    }

    async findEcoeYearsByStudentId(studentId: string): Promise<number[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { student_id: studentId },
            select: ['ecoe_year'],
        });

        const years = ecoeStudents.map(r => r.ecoe_year);
        return Array.from(new Set(years)).sort((a, b) => a - b);
    }

    async addStudent(studentId: string, ecoeId: number, year: number): Promise<void> {
        const newEntity = this.ormRepo.create({
            student_id: studentId,
            final_note: 0,
            final_achievement_level: 'N/A',
            ecoe_year: year,
            ecoe: { id: ecoeId },
        });

        await this.ormRepo.save(newEntity);
    }

    async existsStudentInEcoeYear(studentId: string, year: number): Promise<boolean> {
        const count = await this.ormRepo.count({
            where: {
                student_id: studentId,
                ecoe_year: year,
            },
        });

        return count > 0;
    }

    async findStudentsByEcoeId(ecoeId: number): Promise<EcoeStudent[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { ecoe: { id: ecoeId } },
            relations: ['ecoe', 'competenciesEvaluated', 'competenciesEvaluated.competency'],
        });

        return ecoeStudents.map(EcoeStudentMapper.toDomain);
    }
}
