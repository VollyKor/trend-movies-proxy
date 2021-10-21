import { Controller, Get, Post, Render } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    @Render('index.hbs')
    adminPage() {
        return {
            message: 'Hello world!',
            header: 'Header',
            description: 'Descruption',
            sheduleOptions: [
                {
                    id: '1',
                    value: 'day',
                    descr: 'Once in the Day',
                },
                {
                    id: '2',
                    value: 'week',
                    descr: 'Once in the Week',
                },
                {
                    id: '3',
                    value: 'month',
                    descr: 'Once in the Month',
                },
            ],
        };
    }
    @Post('now')
    handleSubmit() {
        console.log('hello');
    }
}
