import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GetStudentEcoeByYearUseCase } from '../../application/use-cases/get-student-ecoe-by-year.use-case';
import { StudentEcoeByYearDto } from 'src/competencies-ecoe/application/dtos/student-ecoe-by-year.dto';
import { EcoeMessagePatterns } from '../constants/ecoe-patterns.constant';
import { CompetenciesLevelByIdsDto } from 'src/competencies-ecoe/application/dtos/competencies-level-by-ids.dto';
import { GetCompetenciesLevelByIdsUseCase } from 'src/competencies-ecoe/application/use-cases/get-competencies-level-by-ids.use-case';
import { GetStudentEcoeCompetenciesAvgByYearUseCase } from 'src/competencies-ecoe/application/use-cases/get-student-ecoe-avg-by-year.use-case';


@Controller('competencies')
export class CompetencieController {
    constructor(
        private readonly getStudentEcoeByYearUseCase: GetStudentEcoeByYearUseCase,
        private readonly getCompetenciesLevelByIdsUseCase: GetCompetenciesLevelByIdsUseCase,
        private readonly getStudentEcoeAvgByYearUseCase: GetStudentEcoeCompetenciesAvgByYearUseCase,
    ) {}

    @MessagePattern(EcoeMessagePatterns.GET_COMPETENCIES_LEVEL_BY_IDS)
    async getCompetenciesLevelByIds(
        @Payload() data: CompetenciesLevelByIdsDto,
    ) {
        try {
            const { competenciesLevelIds } = data;
            return await this.getCompetenciesLevelByIdsUseCase.execute(competenciesLevelIds);
        } catch (error) {
            throw new RpcException('Error getting competencies by ids');
        }
    }

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
}