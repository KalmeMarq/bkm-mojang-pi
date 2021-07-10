export interface IProfileProps {
    name: string;
    value: string;
    signature?: string;
}
export interface IProfilePropsDecoded {
    name: string;
    value: ISessionValue;
    signature?: string;
}
export interface ISessionProfileDecoded {
    id: string;
    name: string;
    properties: IProfilePropsDecoded[];
    legacy?: boolean;
}
export interface ISessionValueTexInfo {
    url: string;
    metadata?: {
        model: string;
    };
}
export interface ISessionValueTexture {
    [key: string]: ISessionValueTexInfo;
}
export interface ISessionValue {
    timestamp: number;
    profileId: string;
    profileName: string;
    signatureRequired?: boolean;
    textures: ISessionValueTexture[];
}
export interface IProfileProps {
    name: string;
    value: string;
    signature?: string;
}
export interface IProfilePropsDecoded {
    name: string;
    value: ISessionValue;
    signature?: string;
}
export interface ISessionProfile {
    id: string;
    name: string;
    properties: IProfileProps[];
    legacy?: boolean;
}
export interface ISessionProfileDecoded {
    id: string;
    name: string;
    properties: IProfilePropsDecoded[];
    legacy?: boolean;
}
export declare enum OrdersNames {
    MCSold = "item_sold_minecraft",
    MCPreCard = "prepaid_card_redeemed_minecraft",
    CobaltSold = "item_sold_cobalt",
    CobaltPreCard = "prepaid_card_redeemed_cobalt",
    ScrollsSold = "item_sold_scrolls",
    DungeonsSold = "item_sold_dungeons"
}
export declare type IErrorMessage = '' | {
    error: string;
    errorMessage: string;
};
export declare type IAvailabilityErrorMessage = '' | ({
    path: string;
    developerMessage: string;
} & IErrorMessage);
export declare type IOrdersData = {
    total: number;
    last24h: number;
    saleVelocityPerSeconds: number;
};
export declare type IGetUUIDData = {
    name: string;
    id: string;
};
export declare type IGetUsernameData = IGetUUIDData;
export declare type IUserAvailability = 'AVAILABLE' | 'TAKEN';
export declare type IProfileHistory = {
    name: string;
    changedToAt?: number;
}[];
export interface IAuthMojangData {
    user?: {
        properties?: {
            name: string;
            value: string;
        }[];
        username: string;
        id: string;
    };
    accessToken: string;
    clientToken: string;
    availableProfiles: {
        legacy?: boolean;
        name: string;
        id: string;
    }[];
    selectedProfile: {
        legacy?: boolean;
        name: string;
        id: string;
    };
}
export interface IYggdrasilToken {
    sub: string;
    yggt: string;
    spr: string;
    iss: string;
    exp: number;
    iat: number;
}
export interface IMSAToken {
    xuid: number;
    sub: string;
    nbf: number;
    roles: [];
    iss: string;
    exp: number;
    iat: number;
    yuid: string;
}
export interface IAvailabilityData {
    status: 'AVAILABLE' | 'DUPLICATE' | 'NOT_ALLOWED' | '';
}
export interface IMigrationStatus {
    feature: string;
    rollout: false;
}
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
