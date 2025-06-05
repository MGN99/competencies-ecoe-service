import { Ecoe } from "src/competencies-ecoe/domain/models/ecoe.entity";
import { EcoeEntityOrm } from "../persistence/typeorm/entities/ecoe.entity.orm";

export class EcoeMapper {
    static toDomain(entity: EcoeEntityOrm): Ecoe {
        return {
            id: entity.id,
            semester: entity.semester,
            description: entity.description,
        };
    }

    static toDomainPartial(entity: Pick<EcoeEntityOrm, 'id' | 'semester' | 'description'>): Pick<Ecoe, 'id' | 'semester' | 'description'> {
        return {
            id: entity.id,
            semester: entity.semester,
            description: entity.description,
        };
    }
}