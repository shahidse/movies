import { Controller, Put, Body, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the user',
    example: 1,
  })
  @ApiBody({
    type: User,
    examples: {
      updateUser: {
        summary: 'A user profile update request',
        value: {
          name: 'Jane Doe',
          address: '456 Another St',
          image: 'http://example.com/image.jpg',
          dob: '1995-05-15',
          categories: ['Comedy', 'Drama'],
        },
      },
    },
  })
  @ApiBearerAuth()
  @Put(':id/profile')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ) {
    return this.usersService.updateProfile(id, updateData);
  }
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the user who is rating the movie',
    example: 1,
  })
  @ApiBody({
    type: Object,
    examples: {
      rateMovie: {
        summary: 'Rate a movie',
        value: {
          movieId: 3, // Example movie ID
          rating: 4, // Example rating (1-5)
        },
      },
    },
  })
  @ApiBearerAuth()
  @Post(':id/rate')
  async rateMovie(
    @Param('id') userId: number,
    @Body() ratingData: { movieId: number; rating: number },
  ) {
    return this.usersService.rateMovie(
      userId,
      ratingData.movieId,
      ratingData.rating,
    );
  }
}
