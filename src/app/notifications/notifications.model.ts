export class Notification {
    constructor(
        public type: string, 
        public message: string,
        public lock: boolean = false
        ){}
}