import { ShipDto } from "../ships/dto/ship.dto";

export const amountShipType = (ships: ShipDto[], shipLength: number) => {
    return ships.filter(item => item.length === shipLength).length;
}