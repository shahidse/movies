import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MovieRating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @Column()
  movieId: number;

  @Column({ type: 'int', default: 1 })
  rating: number; // Rating from 1 to 5
}
