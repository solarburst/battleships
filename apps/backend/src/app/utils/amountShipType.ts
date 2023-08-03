import { ShipDto } from '../ships/dto/ship.dto';

export const amountShipType = (ships: ShipDto[], shipLength: number) => ships.filter(item => item.length === shipLength).length;
