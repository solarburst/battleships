import { Instance, flow, types } from 'mobx-state-tree';
import { IShip, Orientation } from '../../utils/interfaces';
import { RequestCreator } from '../../api/request-creator';
import { useStore } from '../../mobx/store';

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
        userId: types.number,
    })
    .actions(self => ({
        placeShip: flow(function *(x: number, y: number) {
            const movedShip = yield requestCreator.placeLocatedShip(Number(self.id), {
                x,
                y,
                length: self.length,
                orientation: self.orientation,
            });

            self.x = movedShip.x;
            self.y = movedShip.y;
        }),
        changeOrientation: flow(function *() {
            const orientation = self.orientation === Orientation.Horizontal
                ? Orientation.Vertical
                : Orientation.Horizontal;
            const movedShip = yield requestCreator.placeLocatedShip(Number(self.id), {
                x: self.x,
                y: self.y,
                length: self.length,
                orientation,
            });

            self.orientation = movedShip.orientation;
        }),
        deleteShip: flow(function *() {
            const rootStore = useStore();

            yield requestCreator.deleteShip(Number(self.id));

            const shipToRestore = rootStore.notLocatedShipsStore.getPlacedShipByLength(self.length);

            rootStore.locatedShipsStore.deleteShip(self.id);

            shipToRestore.unhide();
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

