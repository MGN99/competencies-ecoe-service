import { EcoeInstance } from "src/competencies-ecoe/domain/models/ecoe_instance.entity";
import { EcoeInstanceEntityOrm } from "../persistence/typeorm/entities/ecoe-instance.entity.orm";
import { LevelsCompetencyMapper } from "./levels-competency.mapper";
import { EcoeMapper } from "./ecoe.mapper";



export class EcoeInstanceMapper {
    static toDomain(entity: EcoeInstanceEntityOrm): EcoeInstance {
        return new EcoeInstance(
            entity.id,
            entity.description,
            entity.year,
            entity.levelCompetencies.map(LevelsCompetencyMapper.toDomain),
            EcoeMapper.toDomain(entity.ecoe),
        );
    }
}