import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCompetencyEntityOrm } from '../entities/student-competency.entity.orm';
import { StudentCompetency } from 'src/competencies-ecoe/domain/models/student-competency.entity';
import { StudentCompetencyMapper } from 'src/competencies-ecoe/infrastructure/mappers/student-competency.mapper';
import { IStudentCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/student-competency.repository.out.port';

@Injectable()
export class StudentCompetencyRepositoryImpl implements IStudentCompetencyRepositoryOutPort {
    constructor(
    @InjectRepository(StudentCompetencyEntityOrm)
    private readonly repo: Repository<StudentCompetencyEntityOrm>,
    ) {}

    async findByEcoeStudentId(ecoeStudentId: number): Promise<StudentCompetency[]> {
        const studentCompetencies = await this.repo.find({
            where: {
                ecoeStudent: { id: ecoeStudentId },
            },
            relations: ['competency'],
        });

        return studentCompetencies.map(StudentCompetencyMapper.toDomain);
    }

    /*
    async findBySubject(subjectId: number): Promise<StudentCompetency[]> {
        
            return this.repo.find({
                where: {
                ecoeCompetency: {
                    competency: {
                    id: subjectId,
                    },
                },
                },
                relations: [
                'ecoeCompetency',
                'ecoeCompetency.competency',
                'ecoeStudent',
                'ecoeStudent.ecoe',
                ],
        });
        return [];
    }
    */
}