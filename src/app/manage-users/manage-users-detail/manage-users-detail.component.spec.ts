import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersDetailComponent } from './manage-users-detail.component';

describe('ManageUsersDetailComponent', () => {
  let component: ManageUsersDetailComponent;
  let fixture: ComponentFixture<ManageUsersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
