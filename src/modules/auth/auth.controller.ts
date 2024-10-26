import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { SignInDto } from './signin-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    type: User,
    examples: {
      user: {
        summary: 'A sample user',
        value: {
          name: 'John Doe',
          address: '123 Main St',
          image: 'http://example.com/image.jpg',
          dob: '1990-01-01',
          categories: ['Action', 'Comedy'],
          password: 'password123',
        },
      },
    },
  }) // Using the User entity for Swagger documentation
  @Post('signup')
  async signup(
    @Body()
    body: {
      name: string;
      address: string;
      dob: Date;
      password: string;
      image?: string;
      categories?: string[];
    },
  ) {
    return this.authService.signup(
      body.name,
      body.address,
      body.dob,
      body.password,
      body.image,
      body.categories,
    );
  }
  @ApiBody({
    type: SignInDto,
    examples: {
      signIn: {
        summary: 'A successful sign-in request',
        value: {
          username: 'Jane Doe one',
          password: 'password123',
        },
      },
    },
  })
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}
