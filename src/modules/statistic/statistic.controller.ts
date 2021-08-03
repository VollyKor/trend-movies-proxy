import { Req, Controller, Post, HttpCode } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Request } from 'express';

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {}

    @Post()
    @HttpCode(204)
    async addFilm(@Req() req: Request) {
        const userData = req.body?.user;
        const filmData = req.body?.data;

        if (userData?.id) await this.statisticService.handleUser(userData);
        if (filmData?.id) await this.statisticService.handleFilm(filmData);

        return;
    }
}
