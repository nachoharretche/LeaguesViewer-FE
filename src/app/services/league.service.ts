import { Injectable } from '@angular/core';
import { League } from '../models/league';

import { NetworkService } from './network.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LeagueService {
    public leagues: Array<League>;
    public selectedLeague: Observable<League>;

    constructor(
        private networkService: NetworkService
    ) {

    }

    // getLeagues(): Observable <any> {
    //     return this.networkService.getLeagues().subscribe(
    //         result => {
    //             console.log(result);
    //         },
    //         error => {
    //             console.log(error as any);
    //         }
    //     );
    // }
}
