import { Inject, Injectable } from '@nestjs/common';
import { EcoeRepositoryOutPort } from '../../domain/repositories/ecoe.repository.out.port';

@Injectable()
export class GetAvailableEcoesUseCase {
  constructor(
    @Inject('EcoeRepositoryOutPort')
    private readonly ecoeRepository: EcoeRepositoryOutPort
  ) {}

  async execute() {
    return this.ecoeRepository.findAvailable();
  }
}