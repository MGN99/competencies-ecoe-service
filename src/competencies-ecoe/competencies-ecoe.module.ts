import { Module } from "@nestjs/common";
import { TypeOrmPersistenceModule } from "./infrastructure/persistence/typeorm/typeorm-persistence.module";
import { CompetenciesMessageController } from "./infrastructure/messaging/rabbitmq/competencies.controller";
import { GetStudentEcoeByStudentIdAndEcoeIdUseCase } from "./application/use-cases/get-student-ecoe-by-student-id-and-ecoe-id.use-case";
import { GetStudentEcoeCompetenciesAvgByEcoeIdUseCase } from "./application/use-cases/get-student-ecoe-avg-by-ecoe-id.use-case";
import { GetCompetenciesLevelByIdsUseCase } from "./application/use-cases/get-competencies-level-by-ids.use-case";
import { GetStudentEcoeYearsUseCase } from "./application/use-cases/get-student-ecoe-years.use-case";
import { GetLevelCompetencyIdsByCompetencyIdUseCase } from "./application/use-cases/get-level-competency-ids-by-competency-id.use-case";
import { GetCompetencyByIdUseCase } from "./application/use-cases/get-competency-by-id.use-case";
import { EcoesController } from "./infrastructure/controllers/ecoes.controller";
import { AddStudentToEcoeUseCase } from "./application/use-cases/add-student-to-ecoe.use-case";
import { GetStudentsByEcoeIdUseCase } from "./application/use-cases/get-students-by-ecoe-id.use-case";
import { GetEcoesByCycleUseCase } from "./application/use-cases/get-ecoes-by-cycle.use-case";
import { GetCompetenciesUseCase } from "./application/use-cases/get-competencies.use-case";
import { CompetenciesController } from "./infrastructure/controllers/competencies.controller";
import { AddEcoeUseCase } from "./application/use-cases/add-ecoe.use-case";
import { GetEcoesByCycleCurrentYearUseCase } from "./application/use-cases/get-ecoes-by-cycle-current-year";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GetStudentsWithPendingEcoeByCycleUseCase } from "./application/use-cases/get-students-with-pending-ecoe-by-cycle.use-case";
import { DeleteEcoeStudentByIdUseCase } from "./application/use-cases/delete-ecoe-student-by-id.use-case";

@Module({
    imports: [
        TypeOrmPersistenceModule,
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: 'STUDENT_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.get<string>('RABBITMQ_URI') || 'amqp://localhost:5672'],
                        queue: 'student_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                }),
            },
        ]),
    ],
    controllers: [
        CompetenciesController,
        CompetenciesMessageController,
        EcoesController,
    ],
    providers: [
        GetCompetenciesLevelByIdsUseCase,
        GetStudentEcoeByStudentIdAndEcoeIdUseCase,
        GetStudentEcoeCompetenciesAvgByEcoeIdUseCase,
        GetStudentEcoeYearsUseCase,
        GetLevelCompetencyIdsByCompetencyIdUseCase,
        GetCompetencyByIdUseCase,
        AddStudentToEcoeUseCase,
        GetEcoesByCycleUseCase,
        GetStudentsByEcoeIdUseCase,
        GetCompetenciesUseCase,
        AddEcoeUseCase,
        GetEcoesByCycleCurrentYearUseCase,
        GetStudentsWithPendingEcoeByCycleUseCase,
        DeleteEcoeStudentByIdUseCase,
    ],
})
export class CompetenciesEcoeModule { }
