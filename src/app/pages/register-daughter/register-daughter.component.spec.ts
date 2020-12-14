import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDaughterComponent } from './register-daughter.component';

describe('RegisterDaughterComponent', () => {
  let component: RegisterDaughterComponent;
  let fixture: ComponentFixture<RegisterDaughterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDaughterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDaughterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
