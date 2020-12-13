import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { Competition } from '../models/competition.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-competitions',
  templateUrl: './manage-competitions.component.html',
  styleUrls: ['./manage-competitions.component.scss', '../styles/table_style.scss']
})
export class ManageCompetitionsComponent implements OnInit {

  competitions: Observable<Competition[]>;
  sortedCompetitions: Competition[];
  competitionsLength: number = 0;
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
    this._competitionService.deleteCompetitionById(competition.competitionID).subscribe(res => {
      this._modalService.dismissAll();
      this.ngOnInit();
    });
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
    this.competitions.subscribe(competitions => {
      this.sortedCompetitions = competitions;
      this.competitionsLength = competitions.length;
    })
    this.competitions.subscribe(result => this.pageLoaded = true)
  }

  //sorting
  sortData(sort: Sort) {
    const data = this.sortedCompetitions.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCompetitions = data;
      return;
    }

    this.sortedCompetitions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
