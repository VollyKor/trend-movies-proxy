import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HandleRatingDto } from './dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRatingHandler(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.getByIdRating(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllRatingHandler() {
        return this.ratingService.getAllRating();
    }
    @UseGuards(JwtAuthGuard)
    @Get('/average/:id')
    async getaverageRatingHandler(@Param('id', ParseIntPipe) filmId: number) {
        return this.ratingService.getAverageFilmRating(filmId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addRatingHandler(@Body() data: any) {
        return this.ratingService.addRating(data);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/handle')
    async ratingHandler(@Req() req: any, @Body() data: any) {
        return this.ratingService.handleRating(req.user.id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateRatingHandler(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: HandleRatingDto,
    ) {
        return this.ratingService.updateByIdRating(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteRatingHandler(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.deleteRating(id);
    }
}
