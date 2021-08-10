import { IsNumber, IsNotEmpty } from 'class-validator';

export class HandleRatingDto {
    @IsNumber()
    @IsNotEmpty()
    filmId: number;

    @IsNumber()
    @IsNotEmpty()
    rating: number;
}
