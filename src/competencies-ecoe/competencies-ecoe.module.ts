import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";
import { CompetenciesMessageController } from "./infrastructure/messaging/rabbitmq/competencies.controller";
import { GetStudentEcoeByStudentIdAndEcoeIdUseCase } from "./application/use-cases/get-student-ecoe-by-student-id-and-ecoe-id.use-case";
import { GetStudentEcoeCompetenciesAvgByEcoeIdUseCase } from "./application/use-cases/get-student-ecoe-avg-by-ecoe-id.use-case";
import { GetCompetenciesLevelByIdsUseCase } from "./application/use-cases/get-competencies-level-by-ids.use-case";
import { GetStudentEcoeYearsUseCase } from "./application/use-cases/get-student-ecoe-years.use-case";
import { GetLevelCompetencyIdsByCompetencyIdUseCase } from "./application/use-cases/get-level-competency-ids-by-competency-id.use-case";
import { GetCompetencyByIdUseCase } from "./application/use-cases/get-competency-by-id.use-case";
import { EcoesController } from "./infrastructure/controllers/ecoes.controller";
import { AddStudentToEcoeUseCase } from "./application/use-cases/add-student-to-ecoe.use-case";
import { GetStudentsByEcoeIdUseCase } from "./application/use-cases/get-students-by-ecoe-id.use-case";
import { GetEcoesByCycleUseCase } from "./application/use-cases/get-ecoes-by-level.use-case";
import { GetCompetenciesUseCase } from "./application/use-cases/get-competencies.use-case";
import { CompetenciesController } from "./infrastructure/controllers/competencies.controller";


@Module({
    imports: [
        TypeOrmPersistenceModule,
    ],
    controllers: [CompetenciesController, CompetenciesMessageController, EcoesController],
    providers: [
        GetCompetenciesLevelByIdsUseCase,
        GetStudentEcoeByStudentIdAndEcoeIdUseCase,
        GetStudentEcoeCompetenciesAvgByEcoeIdUseCase,
        GetStudentEcoeYearsUseCase,
        GetLevelCompetencyIdsByCompetencyIdUseCase,
        GetCompetencyByIdUseCase,
        AddStudentToEcoeUseCase,
        GetEcoesByCycleUseCase,
        GetStudentsByEcoeIdUseCase,
        GetCompetenciesUseCase,
    ],
})

export class CompetenciesEcoeModule {}