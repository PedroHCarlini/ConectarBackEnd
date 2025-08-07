import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'user';

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid();
  }
}
