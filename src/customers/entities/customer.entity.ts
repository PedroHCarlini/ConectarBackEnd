import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

@Entity('customers')
export class Customer {
  @PrimaryColumn()
  id: string;

  @Column()
  customerName: string;

  @Column()
  cnpj: string;

  @Column()
  legalName: string;

  @Column()
  conectaPlus: boolean;

  @Column()
  status: boolean;

  @Column('text', {
    transformer: {
      to: (value: string[]) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value),
    },
  })
  tags: string[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid();
  }
}
