import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDocumentationComponent } from './table-documentation.component';

describe('TableDocumentationComponent', () => {
  let component: TableDocumentationComponent;
  let fixture: ComponentFixture<TableDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
