import { Injectable } from '@nestjs/common';
import { generateApiKey } from 'generate-api-key';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService) {}
  // KEYS
  private apiKeys: string[] = [
    'ca03na188ame03u1d78620de67282882a84',
    'd2e621a6646a4211768cd68e26f21228a81',
  ];
  validateApiKey(apiKey: string): string | undefined {
    return this.apiKeys.find((apiK) => apiKey === apiK); // @todo get keys from db
  }

  async createApiKey() {
    const newKey = generateApiKey();
  }
}
