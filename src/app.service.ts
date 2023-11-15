import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getHello(): Promise<string> {
    await this.prisma.user.create({
      data: {
        name: 'Alice',
        password: '1234',
      },
    });
    console.log(await this.prisma.user.findMany({}));
    const user = await this.prisma.user.findMany({});
    return user ? 'hello' : 'world';
  }
}
