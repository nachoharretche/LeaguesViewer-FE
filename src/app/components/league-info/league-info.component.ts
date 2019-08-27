import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { League } from '../../models/league';
import { Team } from '../../models/team';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.css']
})
export class LeagueInfoComponent implements OnInit, OnChanges {
  @Input() public league: League;
  public leagueId: number;
  public selectedTeam: Team;
  public teams: Array<Team>;
  public leagueFoundation: string;
  constructor(
    private route: ActivatedRoute,
    private networkService: NetworkService,
    private snackBar: MatSnackBar
    ) {
    this.selectedTeam = null;
    this.leagueId = null;
    this.teams = new Array<Team>();
    this.leagueFoundation = '';
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.leagueId = +params.leagueId;
    });
    this.leagueId ? this.leagueId = this.leagueId : this.leagueId = this.league.id;
    this.getTeams();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.league !== undefined) {
      this.leagueId = changes.league.currentValue.id;
      this.getTeams();
    }
  }

  getLeague() {
    this.networkService.getLeague(this.leagueId).subscribe(
      result => {
          this.league = new League(result);
          this.leagueFoundation = this.league.showFoundation();
      },
      error => {
          console.log(error);
          this.snackBar.open(error, 'Error', {
            duration: 3000,
          });
      }
    );
  }

  getTeams() {
    this.networkService.getTeams(this.leagueId).subscribe(
      result => {
          this.teams = new Array<Team>();
          if (result.length > 0) {
            this.league = new League(result[0].league);
            result.forEach(team => {
              this.teams.push(new Team(team));
            });
            this.selectedTeam = this.teams[0];
            this.leagueFoundation = this.league.showFoundation();
          } else {
            this.getLeague();
            this.selectedTeam = null;
          }
      },
      error => {
          console.log(error);
          this.snackBar.open(error, 'Error', {
            duration: 3000,
          });
      }
    );
  }

  onTeamChange() {
  }

}
