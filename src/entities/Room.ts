import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Amenity {
  WIFI = 'WIFI',
  TV = 'TV',
  AC = 'AC',
  MINIFRIDGE = 'MINI FRIDGE',
}

export enum RoomStatus {
  READY = 'READY',
  MAINTENANCE = 'MAINTENANCE',
}

export enum RoomType {
  STANDARD = 'STANDARD',
  DELUXE = 'DELUXE',
  SUITE = 'SUITE',
}

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  roomNumber!: string;

  @Column({
    type: 'enum',
    enum: RoomType,
    default: RoomType.STANDARD,
  })
  type!: RoomType;

  @Column()
  capacity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerNight!: number;

  @Column()
  floorNo!: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: Amenity,
    array: true,
    default: [],
  })
  amenities!: Amenity[];

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.READY,
  })
  status!: RoomStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default Room;
