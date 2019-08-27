import { showDate } from './../shared/helpers/date.helper';

export class League {
    public id: number;
    public name: string;
    public foundation: Date;
    public organizer: string;
    constructor(
        private json
    ) {
        this.id = json.id;
        this.name = json.name;
        this.foundation = new Date(json.foundation);
        this.organizer = json.organizer;
    }

    public showFoundation(): string {
        return showDate(this.foundation);
    }
}
