import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AccessKeyService } from '../service/acessKey.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';
import { CreateAcessKeyDto } from '../dto/create-acessKey.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessKey } from '../entities/acessKey.entity';

@ApiTags('acessKey')
@Controller('acess-key')
@UseGuards(RolesGuard)
export class AcessKeyController {
  constructor(private readonly accesKeyService: AccessKeyService) {}

  @UseGuards(RolesGuard)
  @Roles('owner')
  @Post()
  @SkipAuth()
  @ApiOperation({ summary: 'Access key' })
  @ApiResponse({ status: 201, description: 'This record has been successfully created', type: AccessKey })
  async createKey(@Body() createAccessKeyDto: CreateAcessKeyDto) {
    return this.accesKeyService.createKey(createAccessKeyDto);
  }
}
