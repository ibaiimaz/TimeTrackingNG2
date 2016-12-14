export class TimeRecord {
    public durationToShow: string;

    constructor(
        public id: number,
        public activity: string,
        public durationStr: string,
        public userName: string,
        public startLocalization: Localization,
        public endLocalization: Localization,
        public isCompleted: boolean,
        public start: string,
        public end: string
    ) {
        this.durationToShow = this.isCompleted ? this.durationStr : 'In progress..';
    }
}

export class Localization {
    public creationDate: Date;
    constructor(
        public longitude: number,
        public latitude: number,
        creationDate?: Date
    ) {
        if (creationDate) {
            this.creationDate = creationDate;
        }
    }
}