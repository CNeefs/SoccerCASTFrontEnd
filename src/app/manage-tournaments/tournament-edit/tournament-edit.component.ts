import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../models/tournament.model';
import { TournamentService } from '../../services/tournament.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.scss']
})
export class TournamentEditComponent implements OnInit {

  editForm: FormGroup;
  selectedTournamentID: number = 0;
  selectedTournament: Tournament = null;

  constructor(private _tournamentService: TournamentService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    this.selectedTournament.edition = this.editForm.controls['edition'].value;
    this._tournamentService.editTournament(this.selectedTournamentID, this.selectedTournament).subscribe();
    this.router.navigate(['admin/tournaments']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTournamentID = params['id'];
    });

    this._tournamentService.getTournamentById(this.selectedTournamentID).subscribe(res => {
      this.selectedTournament = res;
      this.editForm = this.fb.group({
        edition: [res.edition, Validators.required]
      });
    }, error => {
      this.router.navigate(['admin/tournaments']);
    });
  }
}
