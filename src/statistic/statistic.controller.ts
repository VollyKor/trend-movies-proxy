import { Req, Controller, Post } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getDB = require('../../db/models');

const db = getDB();

const { film: Film, user: User } = db;

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {}

    @Post()
    async addFilm(@Req() req: Request) {
        if (!req.body?.user?.userId) throw new Error("userId doesn't exist");
        if (!req.body?.data?.id) throw new Error("filmId doesn't exist");

        const user_id = req.body?.user?.userId;
        const film_id = req.body?.data?.id;

        let currentUser = {};
        let currentFilm = {};

        // check user and assign
        const user = await User.findOne({ where: { user_id } });
        if (user) currentUser = user.dataValues;
        if (!user) {
            const newUser = await User.create({ ...req.body.user, user_id });
            currentUser = newUser.dataValues;
        }

        // check film and assign
        const film = await Film.findOne({ where: { film_id } });
        if (film) currentFilm = film.dataValues;
        if (!film) {
            const newFilm = await User.create({ ...req.body.data, film_id });
            currentFilm = newFilm.dataValues;
        }

        // add statistic click
        await User.increment('clicks', { where: { user_id } });
        await Film.increment('clicks', { where: { film_id } });

        return this.statisticService.add(req.body);
    }
}
