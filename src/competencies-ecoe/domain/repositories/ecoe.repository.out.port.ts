import { Ecoe } from '../models/ecoe.entity';

export interface EcoeRepositoryOutPort {
  findAvailable(): Promise<Pick<Ecoe, 'id' | 'semester' | 'description'>[]>;
}