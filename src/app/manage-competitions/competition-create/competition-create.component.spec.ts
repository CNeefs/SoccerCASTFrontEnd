import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionCreateComponent } from './competition-create.component';

describe('CompetitionCreateComponent', () => {
  let component: CompetitionCreateComponent;
  let fixture: ComponentFixture<CompetitionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
