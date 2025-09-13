import { Component, inject, OnInit } from '@angular/core';
import { LoadingService } from '../../../service/loading.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { loadItems } from '../../../state-mgt/items.action';
import { selectItems } from '../../../state-mgt/items.selector';

@Component({
  selector: 'app-list-items',
  imports: [CommonModule,RouterLink, MatToolbarModule, MatListModule,  MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  public loadingService = inject(LoadingService);
  public items;

  constructor(private store: Store) {
    this.items = this.store.select(selectItems);
  }

  ngOnInit() {
     this.store.dispatch(loadItems());
  }
}
