import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GameEntity } from '../../games/entities/game.entity';

export enum Orientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}

@Entity('ships')
export class ShipEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => GameEntity)
    @JoinColumn()
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
}