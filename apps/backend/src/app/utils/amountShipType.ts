import { ShipEntity } from "../ships/entities/ship.entity"

export const amountShipType = (ships: ShipEntity[], shipLength: number) => {
    return ships.filter(item => item.length === shipLength).length;
}