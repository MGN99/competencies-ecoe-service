import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcoeEntityOrm } from "./entities/ecoe.entity.orm";
import { EcoeStudentEntityOrm } from "./entities/ecoe-student.entity.orm";
import { CompetencyEntityOrm } from "./entities/competency.entity.orm";
import { LevelsCompetencyEntityOrm } from "./entities/levels-competency.entity.orm";
import { StudentCompetencyEntityOrm } from "./entities/student-competency.entity.orm";
import { StudentCompetencyRepositoryImpl } from "./repositories/student-competency.repository";
import { EcoeStudentRepositoryImpl } from "./repositories/ecoe-student.repository";


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
            provide: 'IStudentCompetencyRepositoryOutPort',
            useClass: StudentCompetencyRepositoryImpl,
        },
        {
            provide: 'IEcoeStudentRepositoryOutPort',
            useClass: EcoeStudentRepositoryImpl,
        }
    ],
    exports: [
        'IStudentCompetencyRepositoryOutPort',
        'IEcoeStudentRepositoryOutPort',
    ]
})
export class TypeOrmPersistenceModule {}