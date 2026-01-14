import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  @ApiOperation({ summary: 'Auth login' })
  @ApiResponse({ status: 201, description: 'This record has been successfully created.', type: User })
  async login(@Body() authDto: AuthDto) {
    const user = await this.authService.validateUser(authDto.username, authDto.password);
    if(!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return this.authService.login(user);
  } 
}
