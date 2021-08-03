import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addRatingHandler(@Body() data: any) {
        await this.ratingService.addRating(data);
        return '';
    }
}
