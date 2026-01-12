
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import bcrypt from "bcrypt";
import { Role } from '../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by name or email
    const user = await this.usersService.findOneByNameOrEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    //Check Password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //Include role in JWT payload
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role as Role //Prisma Role enum
    }

    // // Create JWT payload
    // const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
