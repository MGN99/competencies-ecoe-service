import { Ecoe } from '../models/ecoe.entity';
import { EcoeInstance } from '../models/ecoe_instance.entity';

export interface IEcoeRepositoryOutPort {
  //findAvailable(): Promise<Pick<Ecoe, 'id' | 'semester' | 'description'>[]>;
  findAll(): Promise<Ecoe[]>;

  findById(id: number): Promise<Ecoe | null>;

  findInstancesByEcoeId(ecoeId: number): Promise<EcoeInstance[]>

  createEcoeInstance(
    ecoeId: number,
    year: number,
    semester: number,
    description: string,
  ): Promise<EcoeInstance>
}