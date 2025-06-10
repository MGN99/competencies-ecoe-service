import { Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { EcoeStudentEntityOrm } from "../entities/ecoe-student.entity.orm";
import { InjectRepository } from "@nestjs/typeorm";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { Repository } from "typeorm";
import { EcoeStudentMapper } from "src/competencies-ecoe/infrastructure/mappers/ecoe-student.mapper";
import { EcoeInstanceEntityOrm } from "../entities/ecoe-instance.entity.orm";

@Injectable()
export class EcoeStudentRepositoryImpl implements IEcoeStudentRepositoryOutPort {
    constructor(
        @InjectRepository(EcoeStudentEntityOrm)
        private readonly ormRepo: Repository<EcoeStudentEntityOrm>,
        @InjectRepository(EcoeInstanceEntityOrm)
        private readonly ecoeInstanceRepo: Repository<EcoeInstanceEntityOrm>,
    ) { }

    async findOneByStudentAndYear(studentId: string, year: number): Promise<EcoeStudent | null> {
        const entity = await this.ormRepo.findOne({
            where: {
                studentId,
                ecoeInstance: { year },
            },
            relations: [
                'ecoe_instance',
                'competenciesEvaluated',
                'competenciesEvaluated.competency'
            ],
        });

        return entity ? EcoeStudentMapper.toDomain(entity) : null;
    }

    async findEcoeYearsByStudentId(studentId: string): Promise<number[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { studentId },
            relations: ['ecoeInstance'],
            select: ['ecoeInstance'],
        });

        return ecoeStudents
            .map(r => r.ecoeInstance.year)
            .sort((yearA, yearB) => yearA - yearB);
    }

    async addEcoeInstanceStudent(ecoeInstanceId: number, studentId: string): Promise<void> {
        const ecoeInstance = await this.ecoeInstanceRepo.findOne({
            where: {
                ecoe: { id: ecoeInstanceId },
            },
        });

        if (!ecoeInstance) {
            throw new Error('EcoeInstance not found');
        }

        const newEntity = this.ormRepo.create({
            studentId: studentId,
            finalNote: 0,
            finalArchievementLevel: 'N/A',
            ecoeInstance,
        });

        await this.ormRepo.save(newEntity);
    }

    async existsStudentInEcoeYear(studentId: string, year: number): Promise<boolean> {
        const count = await this.ormRepo.count({
            where: {
                studentId: studentId,
                ecoeInstance: { year },
            },
        });

        return count > 0;
    }

    async findStudentsByEcoeId(id: number): Promise<EcoeStudent[]> {
        const ecoeStudents = await this.ormRepo.find({
            where: { ecoeInstance: { ecoe: { id } } },
            relations: ['ecoe', 'competenciesEvaluated', 'competenciesEvaluated.competency'],
        });

        return ecoeStudents.map(EcoeStudentMapper.toDomain);
    }
}
