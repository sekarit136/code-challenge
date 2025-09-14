import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemsComponent } from './list-items.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoadingService } from '../../../service/loading.service';
import { loadItems } from '../../../state-mgt/items.action';
import { selectItems } from '../../../state-mgt/items.selector';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemsComponent,  HttpClientTestingModule, RouterTestingModule ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectItems,
              value: [{ id: 1, name: 'Test', description: 'Desc' }]
            }
          ]
        }),
        { provide: LoadingService, useValue: { loading: () => false } }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadItems on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadItems());
  });

  it('should select items from store', (done) => {
    component.items.subscribe(items => {
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].name).toBe('Test');
      done();
    });
  });

  it('should show spinner when loading', () => {
    component.loadingService = { loading: () => true } as any;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-spinner')).toBeTruthy();
  });
});
