import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewOrderModalPage } from './new-order-modal.page';

describe('NewOrderModalPage', () => {
  let component: NewOrderModalPage;
  let fixture: ComponentFixture<NewOrderModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewOrderModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
