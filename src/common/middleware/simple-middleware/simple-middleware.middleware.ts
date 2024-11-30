import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SimpleMiddlewareMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: any, next: () => void) {
    const result = await this.prisma.artist.findMany();
    console.log(result);

    const ua = req.headers['user-agent'];
    req['ua'] = ua;
    next();
  }
}
