import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCompetencyEntityOrm } from '../entities/student-competency.entity.orm';
import { StudentLevelCompetency } from 'src/competencies-ecoe/domain/models/student-level-competency.entity';
import { StudentCompetencyMapper } from 'src/competencies-ecoe/infrastructure/mappers/student-competency.mapper';
import { IStudentLevelCompetencyRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/student-level-competency.repository.out.port';

@Injectable()
export class StudentLevelCompetencyRepositoryImpl implements IStudentLevelCompetencyRepositoryOutPort {
    constructor(
    @InjectRepository(StudentCompetencyEntityOrm)
    private readonly repo: Repository<StudentCompetencyEntityOrm>,
    ) {}

    async findByEcoeStudentId(ecoeStudentId: number): Promise<StudentLevelCompetency[]> {
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