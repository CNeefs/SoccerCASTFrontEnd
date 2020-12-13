import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/services/toast.service';
import { Sort } from '@angular/material/sort';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.scss', '../styles/table_style.scss']
})
export class ManageTournamentsComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  tournamentsLength: number = 0;
  sortedTournaments: Tournament[];
  currentTournament: Tournament;
  totalTeams: number = 0;

  pageLoaded: boolean = false;

  constructor(private _tournamentService: TournamentService, private router: Router, private _modalService: NgbModal, private _toastService: ToastService) { }

  startTournament(tournament: Tournament) {
    if (tournament.isStart == true && tournament.total_Joined != tournament.match_Count) {
      this._toastService.show("Tournament cannot be started (Not enough teams have joined)", {
        classname: 'bg-danger text-light',
        delay: 3000,
        autohide: true
      });
    } else {
      this._tournamentService.startTournament(tournament).subscribe(event => {
        if(event.type === HttpEventType.Response) {
          this._toastService.show("Tournament started", {
            classname: 'bg-success text-light',
            delay: 3000,
            autohide: true
          });
          this.router.navigate(['user/tournaments/detail'], { queryParams: { id: tournament.tournamentID }});
        }
      });
    }
  }

  goToCreate() {
    this.router.navigate(['admin/tournaments/create']);
  }

  goToEdit(tournament: Tournament) {
    this.router.navigate(['admin/tournaments/edit'], { queryParams: { id: tournament.tournamentID }});
  }

  openDeleteTournament(tournament: Tournament, contentDeleteModel) {
    this.currentTournament = tournament;
    this._modalService.open(contentDeleteModel)
  }

  deleteTournament(tournament: Tournament) {
    this._tournamentService.deleteCTournamentById(tournament.tournamentID).subscribe(res => {
      this._modalService.dismissAll();
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.tournaments = this._tournamentService.getTournaments();
    this.tournaments.subscribe(tournaments => {
      this.sortedTournaments = [];
      tournaments.map(tournament => {
        if (tournament.tournamentStatusID != 2) this.sortedTournaments.push(tournament);
      })
      this.tournamentsLength = this.sortedTournaments.length;
    })
    this.tournaments.subscribe(result => this.pageLoaded = true)
  }

  //sorting
  sortData(sort: Sort) {
    const data = this.sortedTournaments.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTournaments = data;
      return;
    }

    this.sortedTournaments = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'edition': return compare(a.edition, b.edition, isAsc);
        case 'table': return compare(a.table.tableName, b.table.tableName, isAsc);
        case 'total_Joined': return compare(a.total_Joined, b.total_Joined, isAsc);
        case 'winner': return compare(a.winner, b.winner, isAsc);
        default: return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
