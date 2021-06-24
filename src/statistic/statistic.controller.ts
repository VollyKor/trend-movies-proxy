import { Req, Controller, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Request } from 'express';

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {}

    @Post()
    async addFilm(@Req() req: Request) {
        return this.statisticService.add(req.body);
    }
}
