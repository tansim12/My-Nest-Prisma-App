import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  create(createArtistDto: CreateArtistDto) {
    const result = this.prisma.$transaction(async (tx) => {
      const artistData = await tx.artist.create({
        data: createArtistDto as any,
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

  async wildCardDB() {
    console.log(23424);
    try {
      const artists = await this.prisma.artist.findMany({
        include: { song: true, profile: true },
      });
      console.log(artists); // Debugging output
      return artists;
    } catch (error) {
      console.error(error); // Log any Prisma-related errors
      throw new Error('Failed to fetch artists');
    }
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
