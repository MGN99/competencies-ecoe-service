import { Controller, Get } from '@nestjs/common';
import { GetAvailableEcoesUseCase } from 'src/competencies-ecoe/application/use-cases/get-ecoes-availables.use-case';


@Controller('ecoes')
export class EcoesController {
  constructor(private readonly getAvailableEcoesUseCase: GetAvailableEcoesUseCase) {}

  @Get('available')
  async getAvailableEcoes() {
    return this.getAvailableEcoesUseCase.execute();
  }
}