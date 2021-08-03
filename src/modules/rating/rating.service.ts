import { Injectable, Inject } from '@nestjs/common';
import { Rating } from './rating.entity';

@Injectable()
export class RatingService {
    constructor(@Inject('RATING_REPOSITORY') private ratingRepository: typeof Rating) {}
    public async addRating(data: any) {
        const rating = await this.ratingRepository.create(data);
        return rating.get();
    }
}
