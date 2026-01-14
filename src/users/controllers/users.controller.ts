import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { ApiTags, ApiResponse, ApiOperation, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';
import { AccessKeyGuard } from 'src/common/guards/userAcess.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NoRoles } from 'src/common/decorators/noRoles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @SkipAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @NoRoles()
  @UseGuards(RolesGuard, AccessKeyGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiHeader({
    name: 'accessKey',
    description: 'Key special access'
  })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  @ApiBearerAuth('JWT-auth')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return a single user.', type: User })
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.', type: User })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
