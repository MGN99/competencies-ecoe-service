import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GetStudentEcoeByStudentIdAndEcoeIdUseCase } from '../../../application/use-cases/get-student-ecoe-by-student-id-and-ecoe-id.use-case';
import { StudentEcoeByYearDto } from 'src/competencies-ecoe/application/dtos/student-ecoe-by-year.dto';
import { EcoeMessagePatterns } from '../../constants/ecoe-patterns.constant';
import { CompetenciesLevelByIdsDto } from 'src/competencies-ecoe/application/dtos/competencies-level-by-ids.dto';
import { GetCompetenciesLevelByIdsUseCase } from 'src/competencies-ecoe/application/use-cases/get-competencies-level-by-ids.use-case';
import { GetStudentEcoeCompetenciesAvgByEcoeIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-student-ecoe-avg-by-ecoe-id.use-case';
import { StudentDto } from 'src/competencies-ecoe/application/dtos/student.dto';
import { GetStudentEcoeYearsUseCase } from 'src/competencies-ecoe/application/use-cases/get-student-ecoe-years.use-case';
import { GetLevelCompetencyIdsByCompetencyIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-level-competency-ids-by-competency-id.use-case';
import { GetCompetencyByIdUseCase } from 'src/competencies-ecoe/application/use-cases/get-competency-by-id.use-case';
import { Ecoe } from 'src/competencies-ecoe/domain/models/ecoe.entity';
import { EcoeStudent } from 'src/competencies-ecoe/domain/models/ecoe-student.entity';
import { EcoeStudentMapper } from '../../mappers/ecoe-student.mapper';


@Controller()
export class CompetenciesMessageController  {
    constructor(
        private readonly getStudentEcoeByStudentIdAndEcoeIdUseCase: GetStudentEcoeByStudentIdAndEcoeIdUseCase,
        private readonly getCompetenciesLevelByIdsUseCase: GetCompetenciesLevelByIdsUseCase,
        private readonly getStudentEcoeCompetenciesAvgByEcoeIdUseCase: GetStudentEcoeCompetenciesAvgByEcoeIdUseCase,
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

    @MessagePattern(EcoeMessagePatterns.GET_STUDENT_ECOE_BY_ID)
    async getStudentEcoeById(
        @Payload() data: StudentEcoeByYearDto,
    ) {
        try {
            console.log('[LOG] Payload recibido en GET_STUDENT_ECOE_BY_ID:', data);
            const studentEcoe = await this.getStudentEcoeByStudentIdAndEcoeIdUseCase.execute(data);
            console.log(studentEcoe);
            if (!studentEcoe) return {};
            return EcoeStudentMapper.toResponseDto(studentEcoe);
        } catch (error) {
            throw new RpcException('Error getting student ecoe');
        }
    }

    @MessagePattern(EcoeMessagePatterns.GET_STUDENT_ECOE_COMPETENCIES_AVG_BY_ECOE_ID)
    async getStudentEcoeAvgByEcoeId(
        @Payload() data: StudentEcoeByYearDto,
    ) {
        try{
            return await this.getStudentEcoeCompetenciesAvgByEcoeIdUseCase.execute(data);
        } catch (error) {
            throw new RpcException('Error getting student ecoe avg by id');
        }
    }

    @MessagePattern(EcoeMessagePatterns.GET_STUDENT_ECOE_YEARS)
    async getStudentEcoeYears(
        @Payload() data: StudentDto
    ) {
        try {
            const { studentId } = data;
            //Este retorna ecoeId y year-semester
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