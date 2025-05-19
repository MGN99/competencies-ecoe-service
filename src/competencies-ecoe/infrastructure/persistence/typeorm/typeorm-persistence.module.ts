import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcoeEntityOrm } from "./entities/ecoe.entity.orm";
import { EcoeStudentEntityOrm } from "./entities/ecoe-student.entity.orm";
import { CompetencyEntityOrm } from "./entities/competency.entity.orm";
import { LevelsCompetencyEntityOrm } from "./entities/levels-competency.entity.orm";
import { StudentCompetencyEntityOrm } from "./entities/student-competency.entity.orm";
import { StudentCompetencyRepositoryImpl } from "./repositories/student-competency.repository";


@Module({
    imports: [TypeOrmModule.forFeature([
        EcoeEntityOrm,
        EcoeStudentEntityOrm,
        CompetencyEntityOrm,
        LevelsCompetencyEntityOrm,
        StudentCompetencyEntityOrm,
    ])],
    controllers: [],
    providers: [
        {
            provide: 'StudentCompetencyRepository',
            useClass: StudentCompetencyRepositoryImpl,
        },
    ],
    exports: ['StudentCompetencyRepository']
})
export class TypeOrmPersistenceModule {}