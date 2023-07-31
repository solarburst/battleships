import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
    CreateDateColumn
} from 'typeorm';
import { GameEntity } from '../../games/entities/game.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => GameEntity)
    @JoinColumn()
    game: GameEntity;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;
}