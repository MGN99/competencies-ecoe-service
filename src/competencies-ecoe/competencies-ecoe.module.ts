import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";
import { CompetencieController } from "./infrastructure/controllers/competencie.controller";
import { GetStudentEcoeByYearUseCase } from "./application/use-cases/get-student-ecoe-by-year.use-case";
import { GetStudentEcoeCompetenciesAvgByYearUseCase } from "./application/use-cases/get-student-ecoe-avg-by-year.use-case";
import { GetCompetenciesLevelByIdsUseCase } from "./application/use-cases/get-competencies-level-by-ids.use-case";
import { GetStudentEcoeYearsUseCase } from "./application/use-cases/get-student-ecoe-years.use-case";
import { GetLevelCompetencyIdsByCompetencyIdUseCase } from "./application/use-cases/get-level-competency-ids-by-competency-id.use-case";
import { GetCompetencyByIdUseCase } from "./application/use-cases/get-competency-by-id.use-case";
import { Ecoe } from "./domain/models/ecoe.entity";
import { EcoesController } from "./infrastructure/controllers/ecoes.controller";
import { get } from "http";
import { GetAvailableEcoesUseCase } from "./application/use-cases/get-ecoes-availables.use-case";


@Module({
    imports: [
        TypeOrmPersistenceModule,
    ],
    controllers: [CompetencieController,EcoesController],
    providers: [
        GetCompetenciesLevelByIdsUseCase,
        GetStudentEcoeByYearUseCase,
        GetStudentEcoeCompetenciesAvgByYearUseCase,
        GetStudentEcoeYearsUseCase,
        GetLevelCompetencyIdsByCompetencyIdUseCase,
        GetCompetencyByIdUseCase,
        GetAvailableEcoesUseCase,
        
    ],
})

export class CompetenciesEcoeModule {}