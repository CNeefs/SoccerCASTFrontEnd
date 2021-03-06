import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../models/tournament.model';
import { TournamentService } from '../../services/tournament.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { Table } from 'src/app/models/table.model';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.scss', '../../styles/validation_style.scss']
})
export class TournamentCreateComponent implements OnInit {

  createForm: FormGroup;
  numberOfTeams: number[] = [4,8,16,32];
  tables: Table[]

  constructor(private _tournamentService: TournamentService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _tableService: TableService) { }

  onSubmit() {
    var tournament = new Tournament(0, this.createForm.controls['edition'].value, 0, Number(this.createForm.controls['match_Count'].value), false, null, 1, null, Number(this.createForm.controls['table'].value), null);
    this._tournamentService.addTournament(tournament).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/tournaments']);
      }
    });
  }

  ngOnInit(): void {
    this._tableService.getTables().subscribe(res => {​​​​​​​
      this.tables = [];
      res.map(table => {​​​​​​​
        if (table.tableStatusID != 2) this.tables.push(table);
      }​​​​​​​)
      this.createForm = this.fb.group({
        edition: ['', Validators.required],
        table: ['', Validators.required],
        match_Count: [4, Validators.required]
      });
    }​​​​​​​);
  }
}
