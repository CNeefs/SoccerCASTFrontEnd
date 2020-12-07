import { Component, OnInit } from '@angular/core';
import { Competition } from '../../models/competition.model';
import { CompetitionService } from '../../services/competition.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.scss', '../../styles/validation_style.scss']
})
export class CompetitionEditComponent implements OnInit {

  editForm: FormGroup;
  selectedCompetitionID: number = 0;
  selectedCompetition: Competition = null;

  constructor(private _competitionService: CompetitionService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    this.selectedCompetition.name = this.editForm.controls['name'].value;
    this._competitionService.editCompetition(this.selectedCompetitionID, this.selectedCompetition).subscribe();
    this.router.navigate(['admin/competitions']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCompetitionID = params['id'];
    });

    this._competitionService.getCompetitionById(this.selectedCompetitionID).subscribe(res => {
      this.selectedCompetition = res;
      this.editForm = this.fb.group({
        name: [res.name, Validators.required]
      });
    }, error => {
      this.router.navigate(['admin/competitions']);
    });
  }
}
