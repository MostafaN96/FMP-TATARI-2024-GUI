import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllGradeItemComponent } from './show-all-grade-item.component';

describe('ShowAllGradeItemComponent', () => {
  let component: ShowAllGradeItemComponent;
  let fixture: ComponentFixture<ShowAllGradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllGradeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllGradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
