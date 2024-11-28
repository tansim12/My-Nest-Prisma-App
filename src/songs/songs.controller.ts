// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Prisma } from '@prisma/client';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: Prisma.SongCreateInput) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.songsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSongDto: Prisma.SongUpdateInput,
  ) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
