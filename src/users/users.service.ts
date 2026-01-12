import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import prisma from "../lib/prisma";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaservice: PrismaService) {}


  // Create user with hashed password
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }


  // Get all users (exclude password)
  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role:true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

    // Get user by ID
  async findOneById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role:true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const data: any = { ...updateUserDto };

    // If password is being updated, hash it
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  // Delete user
  async remove(id: number) {
    return prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  // Find by name or email (for login)
  async findOneByNameOrEmail(identifier: string) {
    return prisma.user.findFirst({
      where: {
        OR: [{ name: identifier }, { email: identifier }],
      },
    });
  }

  // Verify password (for login)
  async verifyPassword(userId: number, plainPassword: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) return false;

    return bcrypt.compare(plainPassword, user.password);
  }
}
