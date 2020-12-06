import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersListComponent } from './manage-users-list.component';

describe('ManageUsersListComponent', () => {
  let component: ManageUsersListComponent;
  let fixture: ComponentFixture<ManageUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
