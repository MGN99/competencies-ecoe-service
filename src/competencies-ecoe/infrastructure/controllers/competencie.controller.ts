import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GetStudentEcoeByYearUseCase } from '../../application/use-cases/get-student-ecoe-by-year.use-case';
import { GetCompetenciesBySubjectUseCase } from '../../application/use-cases/get-competencies-by-subject.use-case';
//import { CompetenciesBySubjectDto } from '../../application/dtos/competencies-by-subject.dto';
import { StudentEcoeByYearDto } from 'src/competencies-ecoe/application/dtos/student-ecoe-by-year.dto';
import { EcoeMessagePatterns } from '../constants/ecoe-patterns.constant';

@Controller('competencies')
export class CompetencieController {
    constructor(
        private readonly getStudentEcoeByYearUseCase: GetStudentEcoeByYearUseCase,
        private readonly getCompetenciesBySubjectUseCase: GetCompetenciesBySubjectUseCase,
        private readonly getStudentEcoeAvgByYearUseCase: GetStudentEcoeByYearUseCase,
    ) {}

    @MessagePattern(EcoeMessagePatterns.GET_STUDENT_ECOE_BY_YEAR)
    async getStudentEcoeByYear(
        @Payload() data: StudentEcoeByYearDto,
    ) {
        try {
            const studentEcoe = await this.getStudentEcoeByYearUseCase.execute(data);
            console.log(studentEcoe);
            return studentEcoe;
        } catch (error) {
            throw new RpcException('Error getting student ecoe by year');
        }
    }

    @MessagePattern(EcoeMessagePatterns.GET_STUDENT_ECOE_COMPETENCIES_AVG_BY_YEAR)
    async getStudentEcoeAvgByYear(
        @Payload() data: StudentEcoeByYearDto,
    ) {
        try{
            return await this.getStudentEcoeAvgByYearUseCase.execute(data);
        } catch (error) {
            throw new RpcException('Error getting student ecoe avg by year');
        }
    }

    /*
    @MessagePattern('get_competencies_by_subject')
        async getCompetenciesBySubject(
        @Payload() data: GetCompetenciesBySubjectDto,
    ) {
        return this.getCompetenciesBySubjectUseCase.execute(data);
    }
        */
}