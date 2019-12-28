import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RentspacedetailsPage } from './rentspacedetails.page';

describe('RentspacedetailsPage', () => {
  let component: RentspacedetailsPage;
  let fixture: ComponentFixture<RentspacedetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentspacedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RentspacedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
