import { createAction, props } from '@ngrx/store';

export interface Item { id: number; icon: string; name: string; description: string; }

export const loadItems = createAction('[Items] Load Items');
export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: Item[] }>()
);
export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);
