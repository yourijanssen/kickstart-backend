import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'hero', // Specify the table name
  timestamps: true, // Enable timestamps (createdAt and updatedAt)
})
export class HeroModel extends Model<HeroModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;
}
