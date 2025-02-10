import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarySelectInputComponent } from './primary-select-input.component';

describe('PrimarySelectInputComponent', () => {
  let component: PrimarySelectInputComponent;
  let fixture: ComponentFixture<PrimarySelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimarySelectInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimarySelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
