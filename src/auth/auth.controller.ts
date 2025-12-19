import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route (public)
  @Post('login')
  @ApiOkResponse({ description: 'Login successful, returns access token' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  // Protected route example
  @UseGuards(AuthGuard('jwt')) // JWT strategy is used here
  @Get('profile')
  @ApiOkResponse({ description: 'Returns the profile of the authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getProfile(@Request() req) {
    return req.user; // Passport attaches user info here
  }
}
