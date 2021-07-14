import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/db.module';
import { usersProviders } from '../users/user.providers';
import { FilmService } from './film.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [FilmService],
    exports: [FilmService],
})
export class FilmModule {}
