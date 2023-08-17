import { IAnyModelType, types } from 'mobx-state-tree';

interface BaseModelFields {
    id: string;
}

export function createBaseStore<IModelFields extends BaseModelFields>(model: IAnyModelType) {
    return types
        .model({
            store: types.map(model),
        })
        .actions(self => ({
            createModel(data: IModelFields) {
                console.log(data);
                
                self.store.set(data.id, model.create(data));
            },
        }));
}
