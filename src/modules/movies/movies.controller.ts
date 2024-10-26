import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies') // Tag for grouping in Swagger UI
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @UseGuards(JwtAuthGuard)
  @Get('recommended')
  @ApiBearerAuth()
  async getRecommendedMovies(@Req() req: any) {
    return await this.moviesService.getRecommendedMovies(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of movies retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async findAll() {
    return this.moviesService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':categoryId')
  @ApiResponse({
    status: 200,
    description: 'List of movies retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async find(@Param('categoryId') id: number) {
    return this.moviesService.find(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('search')
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Search term for finding movies',
    type: String,
    example: 'Inception', // Example search term
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Movies matching the search term.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'No movies found' }) // Adjust based on your service logic
  async search(@Query('query') query: string) {
    return this.moviesService.searchMovies(query);
  }
  
}
