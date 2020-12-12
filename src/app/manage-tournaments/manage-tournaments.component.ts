import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/services/toast.service';

@Component({
  selector: 'app-manage-tournaments',
  templateUrl: './manage-tournaments.component.html',
  styleUrls: ['./manage-tournaments.component.scss', '../styles/table_style.scss']
})
export class ManageTournamentsComponent implements OnInit {

  tournaments: Observable<Tournament[]>;
  tournamentsLength: number = 0;
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
      this._tournamentService.startTournament(tournament).subscribe(res => {
        this.router.navigate(['user/tournaments/detail'], { queryParams: { id: tournament.tournamentID }});
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
      this.ngOnInit();
    });
    this._modalService.dismissAll();
  }

  ngOnInit(): void {
    this.tournaments = this._tournamentService.getTournaments();
    this.tournaments.subscribe(tournaments => {
      this.tournamentsLength = tournaments.length;
    })
    this.tournaments.subscribe(result => this.pageLoaded = true)
  }
}
