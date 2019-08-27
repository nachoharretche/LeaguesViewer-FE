import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Team } from '../../models/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() public team: Team;
  public leagueId: number;
  public teamId: number;
  constructor(
    private route: ActivatedRoute
  ) {
    this.team = null;
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.leagueId = parseInt(params.leagueId, 64);
      this.teamId = parseInt(params.teamId, 64);
    });
  }

}
