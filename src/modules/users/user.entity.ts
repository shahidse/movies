// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieRating } from './rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({default:"www.example.com/john.png"})
  image: string;

  @Column()
  dob: Date;

  @Column('json')
  categories: string[]; // Store categories as an array

  @Column()
  password: string;

  @OneToMany(() => MovieRating, (rating) => rating.user)
  ratings: MovieRating[];
}
