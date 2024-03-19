import { Module } from '@nestjs/common';
import { ChatgptController } from './chatgpt.controller';
import { ChatgptService } from './chatgpt.service';
import OpenAIApi from 'openai';

@Module({
  controllers: [ChatgptController],
  providers: [
    ChatgptService,
    {
      provide: OpenAIApi,
      useFactory: () => {
        return new OpenAIApi({
          apiKey: process.env.OPENAI_API_KEY,
        });
      },
    },
  ],
})
export class ChatgptModule {}
