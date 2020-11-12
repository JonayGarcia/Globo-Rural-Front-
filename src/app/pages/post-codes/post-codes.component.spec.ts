import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCodesComponent } from './post-codes.component';

describe('PostCodesComponent', () => {
  let component: PostCodesComponent;
  let fixture: ComponentFixture<PostCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
