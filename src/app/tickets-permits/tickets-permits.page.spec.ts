import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsPermitsPage } from './tickets-permits.page';

describe('TicketsPermitsPage', () => {
  let component: TicketsPermitsPage;
  let fixture: ComponentFixture<TicketsPermitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPermitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsPermitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
