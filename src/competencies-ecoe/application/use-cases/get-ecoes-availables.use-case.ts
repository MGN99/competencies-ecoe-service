import { Inject, Injectable } from '@nestjs/common';
import { IEcoeRepositoryOutPort } from '../../domain/repositories/ecoe.repository.out.port';

@Injectable()
export class GetAvailableEcoesUseCase {
  constructor(
    @Inject('IEcoeRepositoryOutPort')
    private readonly ecoeRepository: IEcoeRepositoryOutPort
  ) {}

  async execute() {
    return this.ecoeRepository.findAll();
  }
}