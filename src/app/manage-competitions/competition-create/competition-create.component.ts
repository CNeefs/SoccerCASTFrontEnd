import { Component, OnInit } from '@angular/core';
import { Competition } from '../../models/competition.model';
import { CompetitionService } from '../../services/competition.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.scss']
})
export class CompetitionCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private _competitionService: CompetitionService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    var competition = new Competition(0, this.createForm.controls['name'].value, false);
    this._competitionService.addCompetition(competition).subscribe(event => {
      if(event.type === HttpEventType.Response) {
        this.router.navigate(['admin/competitions']);
      }
    });
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
}
