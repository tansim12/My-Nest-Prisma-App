// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: Prisma.ArtistCreateInput) {
    return this.artistService.create(createArtistDto);
  }

  @Get('/all')
  //!  using req res next such as express.js
  async findAll(@Req() req: Request, @Res() res: Response) {
    console.log(req['ua']);

    try {
      const result = await this.artistService.findAll();
      res.send({ status: HttpStatus.OK, message: 'done', data: result });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: Prisma.ArtistUpdateInput,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }

  //! wildCard Route
  @Get('ab*cd/:id')
  async getAllArtists(@Res() res: Response) {
    try {
      const result = await this.artistService.wildCardDB();
      res.send(result);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
