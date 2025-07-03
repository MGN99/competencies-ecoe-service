import { Inject, Injectable } from "@nestjs/common";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";

@Injectable()
export class GetStudentsWithLastEcoeByEcoeCycleUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepo: IEcoeStudentRepositoryOutPort,
    ) { }

    async execute(cycle: 'BASICO' | 'PROFESIONAL' | 'FINAL'): Promise<EcoeStudent[]> {
        const allEcoeStudents = await this.ecoeStudentRepo.findAllByCycle(cycle);

        const latestByStudent = new Map<string, EcoeStudent>();

        for (const ecoeStudent of allEcoeStudents) {
            const current = latestByStudent.get(ecoeStudent.studentId);

            if (!current) {
                latestByStudent.set(ecoeStudent.studentId, ecoeStudent);
                continue;
            }

            const isNewer =
                ecoeStudent.ecoe.year > current.ecoe.year ||
                (ecoeStudent.ecoe.year === current.ecoe.year &&
                    ecoeStudent.ecoe.semester > current.ecoe.semester);

            if (isNewer) {
                latestByStudent.set(ecoeStudent.studentId, ecoeStudent);
            }
        }

        return Array.from(latestByStudent.values());
    }
}
