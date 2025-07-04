import { Inject, Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { AddStudentToEcoeCommand } from "../commands/add-student-to-ecoe.command";
import { StudentAlreadyInEcoeError } from "src/competencies-ecoe/domain/errors/student-already-in-ecoe.error";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";
import { EcoeNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-not-found.error";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";

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

        const entity = await this.ecoeStudentRepo.findByStudentIdAndEcoeId(data.studentId, data.ecoeId);
        if (entity) {
            throw new StudentAlreadyInEcoeError(data.studentId);
        }

        const newEcoeStudent = new EcoeStudent(
            data.studentId, 
            ecoe
        );

        await this.ecoeStudentRepo.save(newEcoeStudent);
    }
}
