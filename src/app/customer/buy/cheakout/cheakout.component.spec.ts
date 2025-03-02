import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheakoutComponent } from './cheakout.component';

describe('CheakoutComponent', () => {
  let component: CheakoutComponent;
  let fixture: ComponentFixture<CheakoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheakoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheakoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
