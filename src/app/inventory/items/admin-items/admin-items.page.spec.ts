import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminItemsPage } from './admin-items.page';

describe('AdminItemsPage', () => {
  let component: AdminItemsPage;
  let fixture: ComponentFixture<AdminItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
