import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './tasks.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Tasks, (tasks) => tasks.userId)
  tasks: Tasks[];
}
