import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectItems = createSelector(selectItemsState, state => state.items);
export const selectError = createSelector(selectItemsState, state => state.error);