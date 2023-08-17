import { Instance, flow, types } from 'mobx-state-tree';
import { IShip, Orientation } from '../../utils/interfaces';
import { RequestCreator } from '../../api/requestCreator';
import { toast } from 'react-toastify';

export interface ILocatedShipField {
    id: string;
    x: number;
    y: number;
    length: number;
    orientation: Orientation;
}

const requestCreator = RequestCreator.getInstance();

export const LocatedShipModel = types
    .model({
        id: types.identifier,
        x: types.number,
        y: types.number,
        length: types.number,
        orientation: types.optional(
            types.enumeration<Orientation>('Orientation', Object.values(Orientation)),
            Orientation.Horizontal,
        ),
    })
    .actions(self => ({
        placeShip: flow(function *(x: number, y: number) {
            try {
                const movedShip: ILocatedShip = yield requestCreator.placeLocatedShip(Number(self.id), {
                    x,
                    y,
                    length: self.length,
                    orientation: self.orientation,
                });

                self.x = movedShip.x;
                self.y = movedShip.y;
            } catch (error) {
                console.error('Failed to move placed ship', error);
                toast(error.response.data.message);
            }
        }),
        changeOrientation: flow(function *() {
            try {
                const orientation = self.orientation === Orientation.Horizontal
                    ? Orientation.Vertical
                    : Orientation.Horizontal;
                const movedShip: ILocatedShip = yield requestCreator.placeLocatedShip(Number(self.id), {
                    x: self.x,
                    y: self.y,
                    length: self.length,
                    orientation,
                });

                self.orientation = movedShip.orientation;
            } catch (error) {
                console.error('Failed to move placed ship', error);
                toast(error.response.data.message);
            }
        }),
    }))
    .views(self => ({
        get isPlaced() {
            if (self.x && self.y) {
                return self.x >= 0 && self.y >= 0;
            }

            return false;
        },
    }));

export interface ILocatedShip extends Instance<typeof LocatedShipModel>, IShip, ILocatedShipField { }

