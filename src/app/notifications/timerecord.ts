export class TimeRecord {
    constructor(
        public id: number, 
        public activity: string,
        public durationStr: string,
        public userName: string, 
        public startLocalization: Localization,
        public endLocalization: Localization,
        public isCompleted: boolean,
        public start: string
        ){}
}

export class Localization {
    constructor(
    public longitude: number,
    public latitude: number,
    public creationDate
    ){}
}