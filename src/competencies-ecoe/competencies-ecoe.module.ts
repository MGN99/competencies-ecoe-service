import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";
import { CompetencieController } from "./infrastructure/controllers/competencie.controller";
import { GetCompetenciesBySubjectUseCase } from "./application/use-cases/get-competencies-by-subject.use-case";
import { GetStudentEcoeByYearUseCase } from "./application/use-cases/get-student-ecoe-by-year.use-case";
import { GetStudentEcoeCompetenciesAvgByYearUseCase } from "./application/use-cases/get-student-ecoe-avg-by-year.use-case";


@Module({
    imports: [
        TypeOrmPersistenceModule,
    ],
    controllers: [CompetencieController],
    providers: [
        GetCompetenciesBySubjectUseCase,
        GetStudentEcoeByYearUseCase,
        GetStudentEcoeCompetenciesAvgByYearUseCase
    ],
})

export class CompetenciesEcoeModule {}