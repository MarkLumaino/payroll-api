
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

//   async signIn(id: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOneById(Number(id));
//     if (user?.password !== pass) {
//       throw new UnauthorizedException();
//     }
//     const { password, ...result } = user;
//     // TODO: Generate a JWT and return it here
//     // instead of the user object
//     return result;
//   }

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by name or email
    const user = await this.usersService.findOneByNameOrEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
