import { Req, Controller, Post, HttpCode, UseGuards } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {}

    @Post()
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async addFilm(@Req() req: Request) {
        const userData = req.body?.user;
        const filmData = req.body?.data;

        if (userData?.id) await this.statisticService.handleUser(userData);
        if (filmData?.id) await this.statisticService.handleFilm(filmData);

        return;
    }
}
