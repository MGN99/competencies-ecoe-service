import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcoeRepository } from "./repositories/ecoe.repository";
import { EcoeStudentEntityOrm } from "./entities/ecoe-student.entity.orm";
import { CompetencyEntityOrm } from "./entities/competency.entity.orm";
import { LevelCompetencyEntityOrm } from "./entities/level-competency.entity.orm";
import { StudentCompetencyEntityOrm } from "./entities/student-competency.entity.orm";
import { StudentLevelCompetencyRepositoryImpl } from "./repositories/student-level-competency.repository";
import { EcoeStudentRepositoryImpl } from "./repositories/ecoe-student.repository";
import { LevelCompetencyRepository } from "./repositories/level-competency.repository";
import { CompetencyRepository } from "./repositories/competency.repository";
import { EcoeEntityOrm } from "./entities/ecoe.entity.orm";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            EcoeEntityOrm,
            EcoeStudentEntityOrm,
            CompetencyEntityOrm,
            LevelCompetencyEntityOrm,
            StudentCompetencyEntityOrm,
        ]),
    ],
    controllers: [],
    providers: [
        {
            provide: 'IStudentLevelCompetencyRepositoryOutPort',
            useClass: StudentLevelCompetencyRepositoryImpl,
        },
        {
            provide: 'IEcoeStudentRepositoryOutPort',
            useClass: EcoeStudentRepositoryImpl,
        },
        {
            provide: 'ILevelCompetencyRepositoryOutPort',
            useClass: LevelCompetencyRepository,
        },
        {
            provide: 'ICompetencyRepositoryOutPort',
            useClass: CompetencyRepository,
        },
        {
            provide: 'IEcoeRepositoryOutPort',
            useClass: EcoeRepository,
        },
    ],
    exports: [
        'IStudentLevelCompetencyRepositoryOutPort',
        'IEcoeStudentRepositoryOutPort',
        'ILevelCompetencyRepositoryOutPort',
        'ICompetencyRepositoryOutPort',
        'IEcoeRepositoryOutPort',
    ]
})
export class TypeOrmPersistenceModule {}