import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LEAGUES_URL, TEAMS_URL, PLAYERS_URL } from '../shared/constants/url-constants';
import { Player } from '../models/player';

@Injectable()
export class NetworkService {

    constructor(public http: HttpClient) { }

    getLeagues(): Observable<any> {
        return this.http.get(LEAGUES_URL);
    }

    getLeague(leagueId: number) {
        return this.http.get(LEAGUES_URL + leagueId);
    }

    getTeams(leagueId: number): Observable<any> {
        return this.http.get(TEAMS_URL + leagueId);
    }

    getPlayers(teamId: number): Observable<any> {
        return this.http.get(PLAYERS_URL + teamId);
    }

    postPlayer(player: Player): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
         });
        const options = { headers };
        return this.http.post(PLAYERS_URL, JSON.stringify(player), options);
    }
}
