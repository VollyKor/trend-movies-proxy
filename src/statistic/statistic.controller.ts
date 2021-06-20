import { Body, Controller, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {}

    @Post()
    async addFilm(@Body() data) {
        return this.statisticService.add(data);
    }
}
