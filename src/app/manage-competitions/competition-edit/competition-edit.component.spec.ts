import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionEditComponent } from './competition-edit.component';

describe('CompetitionEditComponent', () => {
  let component: CompetitionEditComponent;
  let fixture: ComponentFixture<CompetitionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
