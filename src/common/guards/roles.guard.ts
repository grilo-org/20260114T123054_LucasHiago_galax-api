import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const skipAuth = this.reflector.get<boolean>('skipAuth', context.getHandler());

    if(skipAuth) {
      return true;
    }

    return super.canActivate(context) as Promise<boolean> | Observable<boolean>;
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    if (err || !user)
      throw err || new UnauthorizedException('It´s necessary autenticate');
   

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const getNoRoles = this.reflector.get<boolean>('noRoles', context.getHandler());

    if(getNoRoles) 
      return user;
    
    if (!requiredRoles) 
      return true;

    const hasRole = requiredRoles.some((role) => user.role?.includes(role));
    if (!hasRole) 
      throw new UnauthorizedException('You need be owner to generate api keys');

    return user;
  }
}