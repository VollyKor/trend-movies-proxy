import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
    public add(data) {
        console.log('add film');
        return data;
    }
}
