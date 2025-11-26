import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './Booking';
import { Room } from './Room';

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'booking_rooms' })
export class BookingRoom {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  bookingId!: string;

  // Invisible relation only for FK + cascade
  @ManyToOne(() => Booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookingId' })
  private readonly booking!: Booking;

  @Column()
  roomId!: string;

  // Invisible relation only for FK
  @ManyToOne(() => Room, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'roomId' })
  room!: Room;

  @Column({ type: 'timestamptz' })
  checkIn!: Date;

  @Column({ type: 'timestamptz' })
  checkOut!: Date;

  @Column({ type: 'timestamptz' })
  earlyCheckOut!: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.CONFIRMED,
  })
  status!: BookingStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAtBooking!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
