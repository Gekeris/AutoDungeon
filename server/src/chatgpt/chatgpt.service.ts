import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { ConfigService } from '@nestjs/config';

// TODO COMMON interface
type Message = {
  text: string;
  ai?: boolean; // Indicate if the message is from the AI
};

@Injectable()
export class ChatgptService {
  private readonly openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAIApi({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async chatGptRequest(prompt: string, messages: Message[]): Promise<string> {
    try {
      const history = messages.map(
        (message): ChatCompletionMessageParam => ({
          role: message.ai ? 'assistant' : 'user',
          content: message.text,
        }),
      );

      const completion: ChatCompletion =
        await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            ...history,
          ],
          temperature: 0.5,
          max_tokens: 1000,
        });

      const [content] = completion.choices.map(
        (choice) => choice.message.content,
      );

      return content;
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}
