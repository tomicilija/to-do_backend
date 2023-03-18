import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn } from 'typeorm';

import { Users } from './users.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamptz' }) // Date_time with timezone
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Date_time with timezone
  completedAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => Users, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: string;
}
