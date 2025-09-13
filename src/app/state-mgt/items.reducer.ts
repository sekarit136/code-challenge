import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from '../state-mgt/items.action';
import { Item } from '../state-mgt/items.action';

export interface ItemsState {
  items: Item[];
  error: any;
}

export const initialState: ItemsState = {
  items: [],
  error: null,
};

export const itemsReducer = createReducer(
    initialState,
    on(ItemsActions.loadItems, state => ({ ...state})),
    on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
        ...state,
        items
    })),
    on(ItemsActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        error
    }))
);
