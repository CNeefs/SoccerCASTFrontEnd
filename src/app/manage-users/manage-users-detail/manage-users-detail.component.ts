import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users-detail',
  templateUrl: './manage-users-detail.component.html',
  styleUrls: ['./manage-users-detail.component.scss']
})
export class ManageUsersDetailComponent implements OnInit {

  user: User;
  id: number;
  pageLoaded: boolean = false;

  userSub: Subscription;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private userService: UserService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.userSub = this.userService.getUserById(this.id).subscribe((user: User) => {
          this.user = user;
          this.pageLoaded = true
        });
      }
    )
  }

  onEditUser() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  openDeleteModel(contentDeleteModel) {
    this.modalService.open(contentDeleteModel)
  }

  cancelDelete() {
    this.modalService.dismissAll();
  }

  deleteUser() {
    
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
