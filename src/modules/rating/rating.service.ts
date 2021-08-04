import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize';
// import { Connection } from 'sequelize/types/lib/connection-manager';
import { Rating } from './rating.entity';

@Injectable()
export class RatingService {
    constructor(
        @Inject('RATING_REPOSITORY') private ratingRepository: typeof Rating, // private sequelize: Connection,
        @Inject('SEQUELIZE') private sequelize: Sequelize, // private sequelize: Connection,
    ) {}
    public async addRating(data: any) {
        const rating = await this.ratingRepository.create(data);
        return rating.get();
    }

    public async getByIdRating(id: number): Promise<Rating> {
        return this.ratingRepository.findOne({ where: { id } });
    }

    public async getByParamsRating(data: any): Promise<Rating> {
        return this.ratingRepository.findOne({
            where: {
                user_id: data.user_id,
                film_id: data.film_id,
            },
        });
    }

    public async getAllRating() {
        return this.ratingRepository.findAll();
    }

    public async getAverageFilmRating(film_id: number) {
        const mark = await this.sequelize.query(
            `select avg(r.rating)as "averageRating" from rating r where r.film_id = ${film_id}`,
        );
        const averageRatingObj: any = mark[0][0];
        averageRatingObj.averageRating = Math.round(averageRatingObj.averageRating);
        return averageRatingObj;
    }

    public async updateByIdRating(id: number, data: any) {
        const updatedRating = await this.ratingRepository.update(data, {
            where: { id },
            returning: true,
        });
        return updatedRating[1][0];
    }
    public async deleteRating(id: number) {
        return this.ratingRepository.destroy({ where: { id } });
    }
    public async handleRating(data: any) {
        const currentRating = await this.getByParamsRating({
            user_id: data.user_id,
            film_id: data.film_id,
        });

        if (!currentRating) return this.addRating(data);
        if (data.rating === currentRating.rating) return currentRating.get();

        return this.updateByIdRating(currentRating.id, data);
    }
}
