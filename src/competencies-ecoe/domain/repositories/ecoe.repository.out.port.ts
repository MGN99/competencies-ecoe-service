import { Ecoe } from '../models/ecoe.entity';

export interface IEcoeRepositoryOutPort {
  findAvailable(): Promise<Pick<Ecoe, 'id' | 'semester' | 'description'>[]>;

  findById(id: number): Promise<Ecoe | null>;
}