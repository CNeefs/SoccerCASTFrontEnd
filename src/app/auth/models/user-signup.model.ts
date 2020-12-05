export class UserSignup {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public birthDate: Date,
        public timesWon: number = 0,
        public timesLost: number = 0,
        public roleID: number = 1
    ) {}
}