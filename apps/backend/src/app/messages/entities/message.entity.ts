import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { GameEntity } from '../../games/entities/game.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @ManyToOne(() => GameEntity, game => game.id)
    @JoinColumn({ name: 'gameId' })
        game: GameEntity;

    @Column()
        message: string;

    @CreateDateColumn()
        createdAt: Date;

    @Column()
    @Exclude()
        userId: number;

    @Column()
    @Exclude()
        gameId: number;
}
