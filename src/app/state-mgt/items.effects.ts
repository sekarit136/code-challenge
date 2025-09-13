import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ItemsActions from '../state-mgt/items.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from './items.action';

@Injectable()
export class ItemsEffects {

  private actions = inject(Actions);
  private http = inject(HttpClient);
  
  loadItems$ = createEffect(() =>
    this.actions.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(() =>
        this.http.get<Item[]>('/api/items').pipe(
          map(items => ItemsActions.loadItemsSuccess({ items })),
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))
        )
      )
    )
  );


}
