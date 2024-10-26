import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async findAll() {
    return this.categoryService.findAll();
  }
}
