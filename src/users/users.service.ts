import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  }

  // async findOne(id: number) {
  //   return this.prisma.user.findUnique({
  //     where: { id },
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //     },
  //   });
  // }
  async findOneById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }  // ✅ pass the variable `id`
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // async findOneByNameOrEmail(identifier: string): Promise<User | null> {
  //   return this.prisma.user.findFirst({
  //     where: {
  //       OR: [{ name: identifier }, { email: identifier }],
  //     },
  //   });
  // }

  async findOneByNameOrEmail(identifier: string) {
  return this.prisma.user.findFirst({
    where: { OR: [{ name: identifier }, { email: identifier }] },
  });
}

}
