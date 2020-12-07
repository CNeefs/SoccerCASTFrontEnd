import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { Competition } from '../models/competition.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-competitions',
  templateUrl: './manage-competitions.component.html',
  styleUrls: ['./manage-competitions.component.scss']
})
export class ManageCompetitionsComponent implements OnInit {

  competitions: Observable<Competition[]>;
  currentCompetition: Competition;

  pageLoaded: boolean = false;

  constructor(private _competitionService: CompetitionService, private router: Router, private _modalService: NgbModal) { }

  goToCreate() {
    this.router.navigate(['admin/competitions/create']);
  }

  goToEdit(competition: Competition) {
    this.router.navigate(['admin/competitions/edit'], { queryParams: { id: competition.competitionID }});
  }

  openDeleteCompetition(competition: Competition, contentDeleteModel) {
    this.currentCompetition = competition;
    this._modalService.open(contentDeleteModel)
  }

  deleteCompetition(competition: Competition) {
    this._competitionService.deleteCompetitionById(competition.competitionID).subscribe();
    this.competitions = this.competitions.pipe(
      map(res => res.filter(c => c.competitionID != competition.competitionID))
    );
    this._modalService.dismissAll();
  }

  setActive(competition: Competition) {
    competition.isActive = true;
    this._competitionService.setCompetitionActive(competition.competitionID, competition).subscribe();
    this.competitions = this.competitions.pipe(
      map(res => res.map(c => {
        if (c.competitionID == competition.competitionID) c.isActive = true;
        else c.isActive = false;
        return c;
      }))
    );
  }

  ngOnInit(): void {
    this.competitions = this._competitionService.getCompetitions();
    this.competitions.subscribe(result => this.pageLoaded = true)
  }
}
