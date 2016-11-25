import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlanDialogService } from '../service/plandialog.service';

@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;
  planId;

  buildingList;
  buildingId;
  floorList;
  floorId;

  constructor(
    public planDialogService: PlanDialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        let planId = params['id'];

        this.planDialogService.getPlan(planId)
          .subscribe(plan => this.plan = plan, err => console.log(err));
      })
  }

  logResponse(json){
    return console.log(json)
  }
}
