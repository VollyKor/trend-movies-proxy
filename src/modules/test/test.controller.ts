import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Post()
    public async setKeys(@Body() body) {
        console.log(body.key, body.value);
        return this.testService.setKey(body.key, body.value);
    }

    @Get('/:key')
    public async getKey(@Param('key') key: string) {
        return this.testService.getKey(key);
    }
}
