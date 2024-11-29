import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  create(createArtistDto: Prisma.ArtistCreateInput) {
    return this.prisma.artist.create({
      data: createArtistDto,
      include: {
        song: true,
      },
    });
  }

  findAll() {
    return this.prisma.artist.findMany({ include: { song: true } });
  }

  findOne(id: string) {
    return this.prisma.artist.findUniqueOrThrow({
      where: { id },
      include: {
        song: true,
      },
    });
  }

  update(id: string, updateArtistDto: Prisma.ArtistUpdateInput) {
    return this.prisma.artist.update({
      where: {
        id,
      },
      data: updateArtistDto,
    });
  }

  remove(id: string) {
    return this.prisma.artist.delete({
      where: { id },
    });
  }
}
