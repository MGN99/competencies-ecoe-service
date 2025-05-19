import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EcoeEntityOrm } from "./entities/ecoe.entity.orm";
import { EcoeStudentEntityOrm } from "./entities/ecoe-student.entity.orm";
import { CompetencyEntityOrm } from "./entities/competency.entity.orm";
import { LevelsCompetencyEntityOrm } from "./entities/levels-competency.entity.orm";
import { StudentCompetencyEntity } from "./entities/student-competency.entity.orm";


@Module({
    imports: [TypeOrmModule.forFeature([
        EcoeEntityOrm,
        EcoeStudentEntityOrm,
        CompetencyEntityOrm,
        LevelsCompetencyEntityOrm,
        StudentCompetencyEntity,
    ])],
    controllers: [],
    providers: [],
    exports: []
})
export class TypeOrmPersistenceModule {}