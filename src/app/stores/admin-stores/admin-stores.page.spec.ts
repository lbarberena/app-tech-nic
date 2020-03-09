import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminStoresPage } from './admin-stores.page';

describe('AdminStoresPage', () => {
  let component: AdminStoresPage;
  let fixture: ComponentFixture<AdminStoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
