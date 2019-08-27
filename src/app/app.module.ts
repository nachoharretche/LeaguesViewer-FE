import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders} from './app.routing';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { LeagueComponent } from './components/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { PlayerComponent } from './components/player/player.component';
import { AddPlayerFormComponent } from './components/add-player-form/add-player-form.component';
import { LeagueInfoComponent } from './components/league-info/league-info.component';
import { NetworkService } from './services/network.service';

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    TeamComponent,
    PlayerComponent,
    AddPlayerFormComponent,
    LeagueInfoComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
    FormsModule,
    routing,
    HttpClientModule,
    OverlayModule
  ],
  providers: [
    appRoutingProviders,
    NetworkService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddPlayerFormComponent]
})
export class AppModule { }
