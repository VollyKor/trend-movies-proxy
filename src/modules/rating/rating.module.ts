import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/db.module';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [RatingController],
    providers: [RatingService],
    exports: [RatingService],
})
export class RatingModule {}
