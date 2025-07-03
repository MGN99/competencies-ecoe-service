import { CompetencyNotFoundError } from "src/competencies-ecoe/domain/errors/competency-not-found.error";
import { EcoeStudentNotFoundError } from "src/competencies-ecoe/domain/errors/ecoe-student-not-found.error";
import { StudentCompetency } from "src/competencies-ecoe/domain/models/student-competency.entity";
import { EvaluateStudentCompetencyDto } from "../dtos/evaluate-student-competency.dto";
import { Inject } from "@nestjs/common";
import { IEcoeStudentRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port";
import { IStudentCompetencyRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/student-competency.repository.out.port";
import { ICompetencyRepositoryOutPort } from "src/competencies-ecoe/domain/repositories/competency.repository.out.port";

export class EvaluateStudentCompetencyUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly ecoeStudentRepo: IEcoeStudentRepositoryOutPort,

        @Inject('IStudentCompetencyRepositoryOutPort')
        private readonly studentCompetencyRepo: IStudentCompetencyRepositoryOutPort,

        @Inject('ICompetencyRepositoryOutPort')
        private readonly competencyRepo: ICompetencyRepositoryOutPort,
    ) { }

    async execute(dto: EvaluateStudentCompetencyDto): Promise<void> {
        const { ecoeStudentId, competencyId, grade } = dto;

        const [ecoeStudent, competency] = await Promise.all([
            this.ecoeStudentRepo.findOneById(ecoeStudentId),
            this.competencyRepo.findOneById(competencyId),
        ]);

        if (!ecoeStudent) throw new EcoeStudentNotFoundError(ecoeStudentId);
        if (!competency) throw new CompetencyNotFoundError(competencyId);

        let studentCompetency = await this.studentCompetencyRepo.findOneByEcoeStudentAndCompetency(
            ecoeStudentId,
            competencyId,
        );

        if (!studentCompetency) {
            studentCompetency = new StudentCompetency(grade, ecoeStudent, competency);
        }
        else {
            studentCompetency.grade = grade;
        }

        await this.studentCompetencyRepo.save(studentCompetency);
    }
}
