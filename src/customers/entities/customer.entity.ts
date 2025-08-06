import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
const { nanoid } = require('nanoid');

@Entity('customers')
export class Customer {
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
