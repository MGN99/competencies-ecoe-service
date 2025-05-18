import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCompetencyRepository } from '../../../application/interfaces/student-competency.repository.interface';
import { StudentCompetencyEntity } from './entities/student-competency.entity.orm';

@Injectable()
export class StudentCompetencyRepositoryImpl implements StudentCompetencyRepository {
  constructor(
    @InjectRepository(StudentCompetencyEntity)
    private readonly repo: Repository<StudentCompetencyEntity>,
  ) {}

  async findByStudentAndEcoeYear(studentId: string, year: string): Promise<StudentCompetencyEntity[]> {
    return this.repo.find({
      where: {
        student_id: studentId,
        ecoeStudent: {
          ecoe: {
            semester: year,
          },
        },
      },
      relations: [
        'ecoeStudent',
        'ecoeStudent.ecoe',
        'ecoeCompetency',
        'ecoeCompetency.competency',
      ],
    });
  }

  async findBySubject(subjectId: number): Promise<StudentCompetencyEntity[]> {
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
  }
/*
  async findByStudentAndEcoeYear(studentId: string, year: string): Promise<StudentCompetencyEntity[]> {
    return this.repo.createQueryBuilder('sc')
      .leftJoinAndSelect('sc.ecoeStudent', 'es')
      .leftJoinAndSelect('es.ecoe', 'e')
      .leftJoinAndSelect('sc.ecoeCompetency', 'ec')
      .where('sc.student_id = :studentId', { studentId })
      .andWhere('e.semester = :year', { year })
      .getMany();
  }

  async findBySubject(subjectId: string): Promise<StudentCompetencyEntity[]> {
    return this.repo.createQueryBuilder('sc')
      .leftJoinAndSelect('sc.ecoeCompetency', 'ec')
      .leftJoinAndSelect('ec.competency', 'c')
      .where('c.id = :courseId', { subjectId })
      .getMany();
  }
      */
}