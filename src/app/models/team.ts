import {League} from './league';
import { showDate } from './../shared/helpers/date.helper';

export class Team {
    public id: number;
    public name: string;
    public foundation: Date;
    public stadium: string;
    public league: League;
    constructor(
        private json
    ) {
        this.id = json.id;
        this.name = json.name;
        this.foundation =  new Date(json.foundation);
        this.stadium = json.stadium;
        this.league = new League(json.league);
    }

    public showFoundation(): string {
        return showDate(this.foundation);
    }
}
