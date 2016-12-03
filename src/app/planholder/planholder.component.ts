import { Component, OnInit, Input } from '@angular/core';
import {PlanHolderService} from '../service/planholder.service';
import {ChangesetItem} from "../model/changeset-item";

@Component({
  selector: 'planholder',
  templateUrl: './planholder.component.html',
  styleUrls: ['./planholder.component.css']
})
export class PlanholderComponent implements OnInit {


@Input() changesetId

changeSetItems: ChangesetItem[];

  constructor(public planHolderService : PlanHolderService) { }

  ngOnInit() {
    this.getChangeSetItemDeskNull();
  }


  getChangeSetItemDeskNull()
  {

    this.planHolderService.getChangesetItemsDeskNull(this.changesetId).subscribe(res => {
        this.changeSetItems = res
        }, err => console.log(err));
  }
}
