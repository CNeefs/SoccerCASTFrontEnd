import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-view-tournaments',
  templateUrl: './view-tournaments.component.html',
  styleUrls: ['./view-tournaments.component.scss', '../styles/table_style.scss']
})
export class ViewTournamentsComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  sortedTournaments: Tournament[];

  pageLoaded: boolean = false;

  constructor(private _tournamentService: TournamentService, private router: Router) { }

  goToDetail(tournament: Tournament) {
    this.router.navigate(['user/tournaments/detail'], { queryParams: { id: tournament.tournamentID }});
  }

  ngOnInit(): void {
    this.tournaments = this._tournamentService.getTournaments();
    this.tournaments.subscribe(result => {
      this.sortedTournaments = result;
      this.pageLoaded = true
    });
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
