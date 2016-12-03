import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { ProfileComponent } from './login/profile.component';

import {PlanDialogComponent} from './plandialog/plandialog.component';
import {DeskComponent} from './desk/desk.component';
import { FloorPlanCanvasComponent } from './floor-plan-canvas/floor-plan-canvas.component';

import {LoginService} from './service/login.service';
import { DeskAssignmentService } from './service/desk-assignment.service';
import { PlanService } from './service/plan.service';
import { PlanListComponent } from './plan-list/plan-list.component';
import { EmployeeService } from './service/employee.service';
import { DeskService } from './service/desk.service';
import { DeskCardComponent } from './desk-card/desk-card.component';
import { FloorSelectorComponent } from './floor-selector/floor-selector.component';
import { BuildingSelectorComponent } from './building-selector/building-selector.component';
import { FloorService } from './service/floor.service';
import { BuildingService } from './service/building.service';
import { PlanHolderService } from './service/planholder.service';

import { FloorComponent } from './floor/floor.component';

import { AppRoutingModule  } from './app-routing.module';
import { FloorMarkerComponent } from './floor-marker/floor-marker.component';
import { PlanItemComponent } from './plan-item/plan-item.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { ChangesetListComponent } from './changeset-list/changeset-list.component';
import { DeskCreateDialogComponent } from './desk-create-dialog/desk-create-dialog.component';
import { ChangesetService } from './service/changeset.service'
import { ChangesetItemComponent } from './changeset-item/changeset-item.component';
import { ChangesetItemService } from './service/changeset-item.service';
import { PlanholderComponent } from './planholder/planholder.component';
import { DeskAssignComponent } from './desk-assign/desk-assign.component';
import { PlanHolderComponent } from './plan-holder/plan-holder.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,LogoutComponent,ProfileComponent,
    PlanDialogComponent,
    DeskComponent,
    FloorPlanCanvasComponent,
    DeskCardComponent,
    PlanDialogComponent,
    FloorSelectorComponent,
    PlanListComponent,
    BuildingSelectorComponent,
    FloorComponent,
    FloorMarkerComponent,
    PlanItemComponent,
    LeftnavComponent,
    ChangesetListComponent,
    DeskCreateDialogComponent,
    ChangesetItemComponent,
    FloorMarkerComponent,
    PlanholderComponent,
    DeskAssignComponent,
    PlanHolderComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoginService,
    EmployeeService,
    PlanService,
    FloorService,
    DeskAssignmentService,
    BuildingService,
    DeskService,
    ChangesetService,
    PlanHolderService,
    ChangesetItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
