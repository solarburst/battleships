import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PositionChecker } from '../../utils/positionChecker';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        code: string;

    positionChecker: PositionChecker = new PositionChecker();
}
