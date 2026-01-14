import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessKeyService } from 'src/acessKey/service/acessKey.service';


@Injectable()
export class AccessKeyGuard implements CanActivate {
  constructor(private reflector: Reflector, private accessKeyService: AccessKeyService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const skipAuth = this.reflector.get<boolean>('skipAuth', context.getHandler());

    if(skipAuth) 
      return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const accessKey = request.headers['accesskey']; 

    if (!userId)    
      throw new UnauthorizedException('No user ID provided.');
    if (!accessKey) 
      throw new UnauthorizedException('No access key provided.');

    return this.validateAccessKey(userId, accessKey);
  }

  async validateAccessKey(userId: number, key: string): Promise<boolean> {
    try {
      await this.accessKeyService.useAccessKey(userId, key);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}