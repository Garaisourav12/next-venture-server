import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Room from './Room';

@Entity({ name: 'room_images' })
export class RoomImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  imageUrl!: string;

  // Only FK column you will use
  @Column()
  roomId!: string;

  // Invisible relation only for FK + cascade
  @ManyToOne(() => Room, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' })
  private readonly room!: Room;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
