import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromocodesPage } from './promocodes.page';

describe('PromocodesPage', () => {
  let component: PromocodesPage;
  let fixture: ComponentFixture<PromocodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocodesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
