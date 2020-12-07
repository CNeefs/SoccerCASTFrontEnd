import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../models/tournament.model';
import { TournamentService } from '../../services/tournament.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss', '../../styles/validation_style.scss']
})
export class TournamentCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private _tournamentService: TournamentService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    var tournament = new Tournament(0, this.createForm.controls['edition'].value, Number(this.createForm.controls['match_Count'].value), null);
    this._tournamentService.addTournament(tournament).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/tournaments']);
      }
    });
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      edition: ['', Validators.required],
      match_Count: ['', Validators.required]
    });
  }
}
