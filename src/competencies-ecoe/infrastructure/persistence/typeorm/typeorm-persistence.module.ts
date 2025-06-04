import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcoeEntityOrm } from "./entities/ecoe.entity.orm";
import { EcoeStudentEntityOrm } from "./entities/ecoe-student.entity.orm";
import { CompetencyEntityOrm } from "./entities/competency.entity.orm";
import { LevelCompetencyEntityOrm } from "./entities/level-competency.entity.orm";
import { StudentCompetencyEntityOrm } from "./entities/student-competency.entity.orm";
import { StudentCompetencyRepositoryImpl } from "./repositories/student-competency.repository";
import { EcoeStudentRepositoryImpl } from "./repositories/ecoe-student.repository";
import { LevelCompetencyRepository } from "./repositories/level-competency.repository";
import { CompetencyRepository } from "./repositories/competency.repository";


@Module({
    imports: [TypeOrmModule.forFeature([
        EcoeEntityOrm,
        EcoeStudentEntityOrm,
        CompetencyEntityOrm,
        LevelCompetencyEntityOrm,
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
        },
        {
            provide: 'LevelCompetencyRepositoryOutPort',
            useClass: LevelCompetencyRepository,
        },
        {
            provide: 'ICompetencyRepositoryOutPort',
            useClass: CompetencyRepository,
        }
    ],
    exports: [
        'IStudentCompetencyRepositoryOutPort',
        'IEcoeStudentRepositoryOutPort',
        'LevelCompetencyRepositoryOutPort',
        'ICompetencyRepositoryOutPort',
    ]
})
export class TypeOrmPersistenceModule {}