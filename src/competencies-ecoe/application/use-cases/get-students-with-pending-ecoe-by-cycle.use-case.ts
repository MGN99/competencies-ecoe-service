import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { EcoeStudent } from "src/competencies-ecoe/domain/models/ecoe-student.entity";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { IEcoeRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe.repository.out.port";
import { StudentDetailsDto } from "../dtos/student-details.dto";

@Injectable()
export class GetStudentsWithPendingEcoeByCycleUseCase {
    constructor(
        @Inject('STUDENT_SERVICE')
        private readonly studentClient: ClientProxy,
        @Inject('IEcoeRepositoryOutPort')
        private readonly ecoeRepository: IEcoeRepositoryOutPort,
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepository: IEcoeStudentRepositoryOutPort,
    ) { }

    async execute(cycle: "BASICO" | "PROFESIONAL" | "FINAL"): Promise<StudentDetailsDto[]> {
        const ecoes = await this.ecoeRepository.findAllByCycle(cycle);
        if (ecoes.length === 0) return [];

        const ecoeIds = ecoes.map(e => e.id);
        const ecoeStudents: EcoeStudent[] = await this.ecoeStudentRepository.findByEcoeIds(ecoeIds);

        const ecoeStudentMap = new Map<string, EcoeStudent[]>();
        for (const es of ecoeStudents) {
            if (!ecoeStudentMap.has(es.studentId)) {
                ecoeStudentMap.set(es.studentId, []);
            }
            ecoeStudentMap.get(es.studentId)!.push(es);
        }

        const students: StudentDetailsDto[] = await firstValueFrom(
            this.studentClient.send('GET_ALL_STUDENTS', {})
        );

        const filtered = students.filter(student => {
            const records = ecoeStudentMap.get(student.id);

            if (!records || records.length === 0) return true;

            return records.every(e =>
                e.finalGrade !== null &&
                e.finalGrade > 0 &&
                e.finalGrade < 4
            );
        });

        return filtered;
    }
}
