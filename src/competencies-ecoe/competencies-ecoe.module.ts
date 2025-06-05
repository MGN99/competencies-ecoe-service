import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";
import { CompetencieController } from "./infrastructure/controllers/competencie.controller";
import { GetStudentEcoeByYearUseCase } from "./application/use-cases/get-student-ecoe-by-year.use-case";
import { GetStudentEcoeCompetenciesAvgByYearUseCase } from "./application/use-cases/get-student-ecoe-avg-by-year.use-case";
import { GetCompetenciesLevelByIdsUseCase } from "./application/use-cases/get-competencies-level-by-ids.use-case";
import { GetStudentEcoeYearsUseCase } from "./application/use-cases/get-student-ecoe-years.use-case";
import { GetLevelCompetencyIdsByCompetencyIdUseCase } from "./application/use-cases/get-level-competency-ids-by-competency-id.use-case";
import { GetCompetencyByIdUseCase } from "./application/use-cases/get-competency-by-id.use-case";
import { EcoesController } from "./infrastructure/controllers/ecoes.controller";
import { GetAvailableEcoesUseCase } from "./application/use-cases/get-ecoes-availables.use-case";
import { AddStudentToEcoeCurrentYearUseCase } from "./application/use-cases/add-student-to-ecoe-current-year.use-case";
import { GetEcoeStudentsUseCase } from "./application/use-cases/get-ecoe-students.use-case";


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
        AddStudentToEcoeCurrentYearUseCase,
        GetEcoeStudentsUseCase,
    ],
})

export class CompetenciesEcoeModule {}