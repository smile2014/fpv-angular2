import { Component, OnInit } from '@angular/core';
import {ChangesetItemService} from "../service/changeset-item.service";
import {ChangesetService} from "../service/changeset.service";
import {ChangesetItem} from "../model/changeset-item";
import {Observable} from "rxjs";
import {Changeset} from "../model/changeset";
import {ActivatedRoute} from "@angular/router";
import {Desk} from "../model/desk";

@Component({
  selector: 'app-changeset',
  templateUrl: './changeset.component.html',
  styleUrls: ['./changeset.component.css']
})
export class ChangesetComponent implements OnInit {

  changesetId
  changeset:Observable<Changeset>
  changesetItemList: Observable<ChangesetItem[]>

  constructor(private route: ActivatedRoute,public changesetService: ChangesetService,
              public changesetItemService: ChangesetItemService) { }

  ngOnInit() {
    this.changesetItemList = this.changesetItemService.changesetItems

    this.route.params.subscribe(params => {
      this.changesetId = params['changesetId'];
      this.changeset = this.changesetService.getChangeset(this.changesetId)

      this.changesetItemService.loadAll(this.changesetId)
    });
  }

  updateStatus(changesetItem, status) {
    changesetItem.status = status;
    this.changesetItemService.setChangesetItemStatus(changesetItem).subscribe();
  }

}