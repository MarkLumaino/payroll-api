import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'prisma/prisma.service';
import prisma from "../lib/prisma";

@Injectable()
export class EmployeesService {

  constructor(private prismaservice: PrismaService) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }

  findAll() {
    return prisma.employee.findMany({
      select: {
        id: true,
        userId: true,
        firstName: true,
        middleName: true,
        lastName: true,
        Extension: true,
        age: true,
        sex: true,
        civil: true,
        citizenship: true,
        religion: true,
        dateOfBirth: true,
        placeOfBirth: true,
        birthZipCode: true,
        heightCm: true,
        weightKg: true,
        bloodType: true,
        tshirtSize: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
