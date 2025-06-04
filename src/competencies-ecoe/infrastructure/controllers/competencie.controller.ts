import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GetStudentEcoeByYearUseCase } from '../../application/use-cases/get-student-ecoe-by-year.use-case';
import { StudentEcoeByYearDto } from 'src/competencies-ecoe/application/dtos/student-ecoe-by-year.dto';
import { EcoeMessagePatterns } from '../constants/ecoe-patterns.constant';
import { CompetenciesLevelByIdsDto } from 'src/competencies-ecoe/application/dtos/competencies-level-by-ids.dto';
import { GetCompetenciesLevelByIdsUseCase } from 'src/competencies-ecoe/application/use-cases/get-competencies-level-by-ids.use-case';
import { GetStudentEcoeCompetenciesAvgByYearUseCase } from 'src/competencies-ecoe/application/use-cases/get-student-ecoe-avg-by-year.use-case';
import { StudentDto } from 'src/competencies-ecoe/application/dtos/student.dto';
import { GetStudentEcoeYearsUseCase } from 'src/competencies-ecoe/application/use-cases/get-student-ecoe-years.use-case';
import { GetLevelCompetencyIdsByCompetencyIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-level-competency-ids-by-competency-id.use-case';
import { GetCompetencyByIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-competency-by-id.use-case';


@Controller('competencies')
export class CompetencieController {
    constructor(
        private readonly getStudentEcoeByYearUseCase: GetStudentEcoeByYearUseCase,
        private readonly getCompetenciesLevelByIdsUseCase: GetCompetenciesLevelByIdsUseCase,
        private readonly getStudentEcoeAvgByYearUseCase: GetStudentEcoeCompetenciesAvgByYearUseCase,
        private readonly getStudentEcoeYearsUseCase: GetStudentEcoeYearsUseCase,
        private readonly getLevelCompetencyIdsByCompetencyIdUseCase: GetLevelCompetencyIdsByCompetencyIdUseCase,
        private readonly getCompetencyByIdUseCase: GetCompetencyByIdUseCase,
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

    @MessagePattern(EcoeMessagePatterns.GET_STUDENT_ECOE_YEARS)
    async getStudentEcoeYears(
        @Payload() data: StudentDto
    ) {
        try {
            const { studentId } = data;
            return await this.getStudentEcoeYearsUseCase.execute(studentId);
        } catch (error) {
            throw new RpcException('Error getting student ecoe years');
        }
    }

    @MessagePattern(EcoeMessagePatterns.GET_LEVEL_COMPETENCIES_BY_COMPETENCY_ID)
    async getLevelCompetencyIdsByCompetencyId(
        @Payload() data: { competencyId: number }
    ) {
        try {
            return await this.getLevelCompetencyIdsByCompetencyIdUseCase.execute(data.competencyId);
        } catch (error) {
            throw new RpcException('Error getting level competencies by competency id');
        }
    }

    @MessagePattern(EcoeMessagePatterns.EXISTS_COMPETENCY_BY_ID)
    async existsCompetencyById(@Payload() data: { competencyId: number }): Promise<boolean> {
        try {
            const result = await this.getCompetencyByIdUseCase.execute(data.competencyId);
            return result !== null;
        } catch (error) {
            throw new RpcException('Error checking if competency exists');
        }
    }
}