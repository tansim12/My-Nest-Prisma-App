import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}
  create(createSongDto: Prisma.SongCreateInput) {
    const result = this.prisma.song.create({
      data: createSongDto,
    });
    return result;
  }

  findAll(query: any) {
    console.log(query);

    const result = this.prisma.song.findMany();
    return result;
  }

  findOne(id: string) {
    return this.prisma.song.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSongDto: Prisma.SongUpdateInput) {
    return this.prisma.song.update({
      where: {
        id,
      },
      data: updateSongDto,
    });
  }

  remove(id: string) {
    return this.prisma.song.delete({
      where: {
        id,
      },
    });
  }
}
