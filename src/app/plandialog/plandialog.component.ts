import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../service/plan.service";
import {DeskService} from "../service/desk.service";
import {DeskAssignmentService} from "../service/desk-assignment.service";
import {ChangesetService} from "../service/changeset.service";
import {Observable} from "rxjs";
import {Desk} from "../model/desk";
import {ChangesetItemService} from "../service/changeset-item.service";
import {BuildingService} from "../service/building.service";
import {FloorService} from "../service/floor.service";
import {Floor} from "../model/floor";
import {Building} from "../model/building";

@Component({
  selector: 'plan-dialog',
  templateUrl: './plandialog.component.html',
  styleUrls: ['./plandialog.component.css']
})

export class PlanDialogComponent implements OnInit {
  plan;
  changesetId;

  selectedFloor:Floor
  selectedBuilding:Building

  changesetDate
  selectedChangeset
  noChangeset = false

  floorMode = "View";


  desks: Observable<Desk[]>;

  constructor(
    public planService: PlanService,
    public deskService:DeskService,
    public deskAssignmentService: DeskAssignmentService,
    public changesetService: ChangesetService,
    public changesetItemService: ChangesetItemService,
    public buildingService: BuildingService,
    public floorService: FloorService,

    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
        let planId = params['id'];
        this.planService.getPlan(planId).subscribe(plan => this.plan = plan, err => console.log(err));

        let floorId = Number(params['floorId']);
        let buildingId = Number(params['buildingId']);
        if(buildingId && floorId) {
          this.buildingService.buildings.subscribe(list=>{
            this.buildingService.get(buildingId).subscribe(b=>{
              this.selectedBuilding = b
              this.floorService.loadAll(buildingId)
            })
          })

          this.floorService.getFloor(floorId).subscribe(f=>{
            this.selectedFloor = f
            this.loadFloorData()
          })
        }
      })


      this.desks = this.deskService.desks;

      //TO DO REMOVE ME MOCK UP DATA
      this.changesetId = 1
  }

  logResponse(json){
    return console.log(json)
  }

  loadFloorData(){
    if (this.selectedFloor) {
      this.getDeskByFloor(this.selectedFloor.id);
      this.getDeskAssignmentsByFloor(this.selectedFloor.id);
    }
  }

  loadChangesetData(){
    if (this.changesetDate) {
      this.selectedChangeset = this.changesetService.getChangesetByEffectiveDate(this.changesetDate)

      this.selectedChangeset.subscribe(
        changeset=> {
          this.changesetItemService.loadAll(changeset.id)

          this.noChangeset = false

          return changeset
        },
        err => {
          this.noChangeset = true;
        }
      )
    }
  }

  createChangeset(){
    if(this.changesetDate){
      let changeset = {effectiveDate: this.changesetDate, status: "IN_PROGRESS", plan: this.selectedBuilding.plan}

      this.changesetService.save(changeset).subscribe(cs=> {
        this.selectedChangeset = cs
        this.noChangeset = false;
      })
    }
  }

  getDeskByFloor(floorId) {
    this.deskService.loadAll(floorId)
  }

  getDeskAssignmentsByFloor(floorId) {
    this.deskAssignmentService.loadAll(floorId)
  }

  toggleFloorMode() {
    if ("View" === this.floorMode) {
      this.floorMode = "Edit";
    } else {
      this.floorMode = "View"
    }
  }
}

