import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RentspacePage } from './rentspace.page';

describe('RentspacePage', () => {
  let component: RentspacePage;
  let fixture: ComponentFixture<RentspacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentspacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RentspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
