import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  running() {
    return { status: 200, message: 'running' };
  }
}
