import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma.service';
import { SimpleMiddlewareMiddleware } from 'src/common/middleware/simple-middleware.middleware';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddlewareMiddleware).forRoutes(
      {
        path: 'artist/all',
        method: RequestMethod.GET,
      },
      'artist/(.*)',
    );
  }
}
