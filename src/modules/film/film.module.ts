import { Module } from '@nestjs/common';
import { CustomLoggerModule } from 'src/service/loggers/logger.module';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/db.module';
import { FilmService } from './film.service';

@Module({
    imports: [DatabaseModule, AuthModule, CustomLoggerModule],
    providers: [FilmService],
    exports: [FilmService],
})
export class FilmModule {}
