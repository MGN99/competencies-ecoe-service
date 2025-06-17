import { Inject, Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { AddStudentToEcoeCommand } from "../commands/add-student-to-ecoe.command";
import { StudentAlreadyInEcoeError } from "src/competencies-ecoe/domain/errors/student-already-in-ecoe.error";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";
import { EcoeNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-not-found.error";

@Injectable()
export class AddStudentToEcoeUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepo: IEcoeStudentRepositoryOutPort,
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepo: IEcoeRepositoryOutPort,
    ) {}

    async execute(data: AddStudentToEcoeCommand): Promise<void> {
        const ecoe = await this.ecoeRepo.findOneById(data.ecoeId);
        if (!ecoe) {
            throw new EcoeNotFoundError(data.ecoeId);
        }

        console.log(ecoe);
        const entity = await this.ecoeStudentRepo.findByStudentIdAndEcoeId(data.studentId, data.ecoeId);
        console.log(entity);
        if (entity) {
            throw new StudentAlreadyInEcoeError(data.studentId);
        }

        await this.ecoeStudentRepo.save(
            ecoe,
            data.studentId
        );
    }
}
