import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";
import { CompetencieController } from "./infrastructure/controllers/competencie.controller";
import { GetStudentEcoeByYearUseCase } from "./application/use-cases/get-student-ecoe-by-year.use-case";
import { GetStudentEcoeCompetenciesAvgByYearUseCase } from "./application/use-cases/get-student-ecoe-avg-by-year.use-case";
import { GetCompetenciesLevelByIdsUseCase } from "./application/use-cases/get-competencies-level-by-ids.use-case";


@Module({
    imports: [
        TypeOrmPersistenceModule,
    ],
    controllers: [CompetencieController],
    providers: [
        GetCompetenciesLevelByIdsUseCase,
        GetStudentEcoeByYearUseCase,
        GetStudentEcoeCompetenciesAvgByYearUseCase
    ],
})

export class CompetenciesEcoeModule {}