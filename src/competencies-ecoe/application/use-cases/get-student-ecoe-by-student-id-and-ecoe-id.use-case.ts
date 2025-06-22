import { Inject, Injectable } from '@nestjs/common';
import { StudentEcoeByYearDto } from '../dtos/student-ecoe-by-year.dto';
import { IEcoeStudentRepositoryOutPort } from 'src/competencies-ecoe/domain/repositories/ecoe-student.repository.out.port';

@Injectable()
export class GetStudentEcoeByStudentIdAndEcoeIdUseCase {
    constructor(
        @Inject('IEcoeStudentRepositoryOutPort')
        private readonly repositoryEcoeStudent: IEcoeStudentRepositoryOutPort,
    ) {}

    async execute(dto: StudentEcoeByYearDto): Promise<any> {
        try {
            console.log('[LOG] UseCase recibe:', dto);
            const ecoeStudent = await this.repositoryEcoeStudent.findByStudentIdAndEcoeId(dto.studentId, dto.ecoeId);
            console.log('[LOG] UseCase ecoeStudent encontrado:', ecoeStudent);

            if (!ecoeStudent) {
                console.warn('[WARN] No se encontró ecoeStudent para:', dto);
                return {};
            }
        
        return ecoeStudent;
        } catch (error) {
         console.error('[ERROR] En UseCase:', error);
            throw error;
        }
    }
}
