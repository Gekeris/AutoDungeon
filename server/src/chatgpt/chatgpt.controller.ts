import {
  Body,
  Controller,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

type Message = {
  text: string;
  ai?: boolean; // Indicate if the message is from the AI
};

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly service: ChatgptService) {}

  @Post()
  async chatGpt(
    @Body() body: { prompt: string; messages: Message[] },
  ): Promise<string> {
    try {
      const { prompt, messages } = body;
      const response = await this.service.chatGptRequest(prompt, messages);
      return response;
    } catch (e) {
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}
