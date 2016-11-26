import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlanService } from '../service/plan.service';
import { DeskService } from '../service/desk.service';
import { DeskAssignmentService } from '../service/desk-assignment.service';

import { Floor } from '../model/floor';

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
  changesetId;

  selectedFloor;
  desks;
  deskAssignments;

  selectedBuilding

  floorMode = "View";

  constructor(
    public planService: PlanService,
    public deskService:DeskService,
    public deskAssignmentService: DeskAssignmentService,
    
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        let planId = params['id'];

        this.planService.getPlan(planId)
          .subscribe(plan => this.plan = plan, err => console.log(err));
      })

      //TO DO REMOVE ME MOCK UP DATA
      this.changesetId = 1
  }

  logResponse(json){
    return console.log(json)
  }

  floorChange(){
    if (this.selectedFloor) {
        this.getDeskByFloor();
        this.getDeskAssignmentsByFloor();
      }
  }

  getDeskByFloor() {
    this.deskService.getDesks(this.selectedFloor.id).subscribe(
      json => {
        this.desks = json;
        console.log("Desk ", json)
      },
      err => {
        console.log(err);
      });
  }

  getDeskAssignmentsByFloor() {
    this.deskAssignmentService.getDeskAssignments(this.selectedFloor.id).subscribe(
      result => {
        this.deskAssignments = result;
        console.log("DeskAssigments", result);
      }
    );
  }

  toggleFloorMode() {
    if ("View" === this.floorMode) {
      this.floorMode = "Edit";
    } else {
      this.floorMode = "View"
    }
  }
}

