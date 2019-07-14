
export enum AccountType {
    CUSTOMER = 'customer',
    EMPLOYEE = 'employee',
    ADMIN = 'admin',
}

export interface Account {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    type: AccountType;
}

export interface ISession {
    revoked: boolean;
    _id: string;
    accessToken: string;
    account: Account;
    timeStamp: Date;
    expiration: Date;
}
