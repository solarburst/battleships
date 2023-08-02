import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GameEntity } from '../../games/entities/game.entity';
import { Exclude } from 'class-transformer';

export enum Orientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}

@Entity('ships')
export class ShipEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => GameEntity, (game) => game.id)
    @JoinColumn({ name: 'gameId' })
    game: GameEntity;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column()
    length: number;

    @Column({
        type: "enum",
        enum: Orientation,
        default: Orientation.HORIZONTAL
    })
    orientation: Orientation;

    @Column()
    userId: number;

    @Column()
    gameId: number;
}