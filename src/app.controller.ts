import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class AppController {
  @Get()
  healthCheck(): object {
    return { message: 'healthy' };
  }
}
