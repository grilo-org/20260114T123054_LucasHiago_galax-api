import { Injectable } from '@nestjs/common';
import { Mercadopagoconfig } from '../interfaces';

@Injectable()
export class AuthService {
  protected async requestAsync(
    config: Mercadopagoconfig,
    method: string,
    endpoint: string,
    params: Record<string, any> = null,
    data: any = null,
    headers: any = null
  ): Promise<any> {
    //const authorization = `Basic ${Buffer.from(`${config.username}/token:${config.token}`, 'utf8').toString('base64')}`;
  }
}
