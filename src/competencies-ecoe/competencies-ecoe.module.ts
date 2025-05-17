import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";


@Module({
    imports: [
        TypeOrmPersistenceModule,
    ],
    controllers: [],
    providers: [],
})

export class CompetenciesEcoeModule {}