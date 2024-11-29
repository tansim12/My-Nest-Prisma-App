import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  create(createArtistDto: Prisma.ArtistCreateInput) {
    const result = this.prisma.$transaction(async (tx) => {
      const artistData = await tx.artist.create({
        data: createArtistDto,
        include: {
          profile: true,
          song: true,
        },
      });
      await tx.profile.create({
        data: {
          artistId: artistData.id,
        },
      });
      return tx.artist.findUnique({
        where: {
          id: artistData.id,
        },
        include: {
          song: true,
          profile: true,
        },
      });
    });
    return result;
  }

  findAll() {
    return this.prisma.artist.findMany({
      include: { song: true, profile: true },
    });
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
