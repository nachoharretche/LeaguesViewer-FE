import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { League } from '../../models/league';
import { NetworkService } from '../../services/network.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  public leagues: Array<League>;
  public selectedLeague: League;
  public leagueToDisplay: League;
  leagueCtrl = new FormControl('', [
    Validators.required
  ]);
  constructor(
    private leagueService: NetworkService,
    private snackBar: MatSnackBar
    ) {
    this.leagues = [];
    this.selectedLeague = null;
    this.leagueToDisplay = null;
   }
  ngOnInit() {
    this.leagueService.getLeagues().subscribe(
      result => {
          result.forEach(league => {
            this.leagues.push(league);
          });
          this.selectedLeague = this.leagues[0];
          this.leagueToDisplay = this.selectedLeague;
      },
      error => {
          console.log(error);
          this.snackBar.open(error, 'Error', {
            duration: 3000,
          });
      }
  );
  }

  onLeagueChange() {
  }
}
