import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SongsModule, ArtistModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
