import { IAuthMojangData, IAvailabilityData, IAvailabilityErrorMessage, IErrorMessage, IGetUsernameData, IGetUUIDData, IMigrationStatus, IMSAToken, IOrdersData, IProfileHistory, ISessionProfile, ISessionProfileDecoded, IUserAvailability, IYggdrasilToken, OrdersNames } from './types';
export default class MojangAPI {
    static getOrdersStats(...orders: OrdersNames[]): Promise<[IErrorMessage, IOrdersData]>;
    static getOrdersStatsSync(orders: OrdersNames[], callback: (err: IErrorMessage, data: IOrdersData) => void): void;
    static getBlockedServers(maxlength?: number): Promise<[string[]]>;
    static getBlockedServersSync(callback: (data: string[]) => void): void;
    static getBlockedServersSync(maxlength: number, callback: (data: string[]) => void): void;
    static isUsernameAvailable(username: string): Promise<[IUserAvailability]>;
    static isUsernameAvailableSync(username: string, callback: (data: IUserAvailability) => void): void;
    static getUUID(username: string): Promise<[IErrorMessage, IGetUUIDData]>;
    static getUUID(username: string[]): Promise<[IErrorMessage, IGetUUIDData[]]>;
    static getUUIDSync(username: string, callback: (error: IErrorMessage, data: IGetUUIDData) => void): void;
    static getUUIDSync(username: string[], callback: (error: IErrorMessage, data: IGetUUIDData[]) => void): void;
    static getUsername(uuid: string): Promise<[IErrorMessage, IGetUUIDData]>;
    static getUsernameSync(uuid: string, callback: (error: IErrorMessage, data: IGetUsernameData) => void): void;
    static getUserProfile(uuid: string): Promise<[IErrorMessage, ISessionProfile]>;
    static getUserProfile(uuid: string, decoded: boolean): Promise<[IErrorMessage, ISessionProfileDecoded]>;
    static getUserProfileSync(uuid: string, decoded: boolean | undefined, callback: (error: IErrorMessage, data: ISessionProfile | ISessionProfileDecoded) => void): void;
    static getProfileHistory(uuid: string): Promise<[IErrorMessage, IProfileHistory]>;
    static getProfileHistorySync(uuid: string, callback: (error: IErrorMessage, data: IProfileHistory) => void): void;
    static mojangAccountAuth(username: string, password: string, requestUser?: boolean): Promise<[IErrorMessage, IAuthMojangData]>;
    static decodeJWT(token: string, type: 'MSA'): IMSAToken;
    static decodeJWT(token: string, type: 'Yggdrasil'): IYggdrasilToken;
    private static getsFTTagurlPost;
    static usernameAvailability(username: string, token: string): Promise<[IAvailabilityErrorMessage, IAvailabilityData]>;
    static usernameAvailabilitySync(username: string, token: string, callback: (error: IAvailabilityErrorMessage, data: IAvailabilityData) => void): void;
    static checkMigrationStatus(token: string): Promise<[IMigrationStatus]>;
    static checkMigrationStatusSync(token: string, callback: (data: IMigrationStatus) => void): void;
}
