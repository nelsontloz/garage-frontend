export interface ISession {
    revoked: boolean;
    _id: string;
    accessToken: string;
    user: string;
    timeStamp: Date;
    expiration: Date;
}
