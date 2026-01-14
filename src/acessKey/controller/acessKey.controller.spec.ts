import { Test, TestingModule } from '@nestjs/testing';
import { AcessKeyController } from './acessKey.controller';

describe('AcessKeyController', () => {
  let controller: AcessKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcessKeyController],
    }).compile();

    controller = module.get<AcessKeyController>(AcessKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
