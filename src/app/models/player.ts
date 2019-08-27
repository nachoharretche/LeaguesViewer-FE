export class Player {
    public id: number;
    public fullName: string;
    public age: number;
    public shirtNumber: number;
    public teamId: number;
    constructor(
        private json
    ) {
        this.id = json.id;
        this.fullName = json.fullName;
        this.age = json.age;
        this.shirtNumber = json.shirtNumber;
        this.teamId = json.teamId;
    }
}
