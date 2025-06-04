import { Inject, Injectable } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { AddStudentToEcoeCommand } from "../commands/add-student-to-ecoe.command";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";
import { StudentAlreadyInEcoeYearError } from "src/competencies-ecoe/domain/errors/student-already-in-ecoe-year.error";

@Injectable()
export class AddStudentToEcoeCurrentYearUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepo: IEcoeStudentRepositoryOutPort,
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepo: IEcoeRepositoryOutPort,
    ) {}

    async execute(data: AddStudentToEcoeCommand): Promise<void> {
        const ecoe = await this.ecoeRepo.findById(data.ecoeId);
        if (!ecoe) {
            throw new Error('Ecoe not found');
        }

        const currentYear = new Date().getFullYear();

        const alreadyExists = await this.ecoeStudentRepo.existsStudentInEcoeYear(data.studentId, currentYear);
        if (alreadyExists) {
            throw new StudentAlreadyInEcoeYearError(data.studentId, currentYear);
        }
            
        await this.ecoeStudentRepo.addStudent(
            data.studentId, 
            ecoe.id, 
            currentYear
        );
    }
}