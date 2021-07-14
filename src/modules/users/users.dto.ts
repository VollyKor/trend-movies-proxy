import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    user_id: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsNumber()
    clicks: number;
}
