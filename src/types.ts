
export interface IProfileProps {
  name: string,
  value: string,
  signature?: string
}

export interface IProfilePropsDecoded {
  name: string,
  value: ISessionValue,
  signature?: string
}

export interface ISessionProfileDecoded {
  id: string,
  name: string,
  properties: IProfilePropsDecoded[],
  legacy?: boolean
}

export interface ISessionValueTexInfo {
  url: string,
  metadata?: {
    model: string
  }
}

export interface ISessionValueTexture {
  [key: string]: ISessionValueTexInfo
}

export interface ISessionValue {
  timestamp: number,
  profileId: string,
  profileName: string,
  signatureRequired?: boolean,
  textures: ISessionValueTexture[]
}

export interface IProfileProps {
  name: string,
  value: string,
  signature?: string
}

export interface IProfilePropsDecoded {
  name: string,
  value: ISessionValue,
  signature?: string
}

export interface ISessionProfile {
  id: string,
  name: string,
  properties: IProfileProps[],
  legacy?: boolean
}

export interface ISessionProfileDecoded {
  id: string,
  name: string,
  properties: IProfilePropsDecoded[],
  legacy?: boolean
}

export enum OrdersNames {
  MCSold = 'item_sold_minecraft',
  MCPreCard = 'prepaid_card_redeemed_minecraft',
  CobaltSold = 'item_sold_cobalt',
  CobaltPreCard = 'prepaid_card_redeemed_cobalt',
  ScrollsSold = 'item_sold_scrolls',
  DungeonsSold = 'item_sold_dungeons'
}

export type IErrorMessage = '' | {
  error: string,
  errorMessage: string
}

export type IAvailabilityErrorMessage = '' | ({
  path: string,
  developerMessage: string
} & IErrorMessage)

export type IOrdersData = {
  total: number,
  last24h: number,
  saleVelocityPerSeconds: number
}

export type IGetUUIDData = {
  name: string,
  id: string
}

export type IGetUsernameData = IGetUUIDData
export type IUserAvailability = 'AVAILABLE' | 'TAKEN'

export type IProfileHistory = {
  name: string,
  changedToAt?: number
}[]

export interface IAuthMojangData {
  user?: {
    properties?: { name: string, value: string }[]
    username: string,
    id: string
  },
  accessToken: string
  clientToken: string,
  availableProfiles : { legacy?: boolean, name: string, id: string }[],
  selectedProfile : {
    legacy?: boolean,
    name: string,
    id: string
  }
}

export interface IYggdrasilToken {
  sub: string,
  yggt: string,
  spr: string,
  iss: string,
  exp: number,
  iat: number 
}

export interface IMSAToken {
  xuid: number,
  sub: string,
  nbf: number,
  roles: [],
  iss: string,
  exp: number,
  iat: number,
  yuid: string
}

export interface IAvailabilityData {
  status: 'AVAILABLE' | 'DUPLICATE' | 'NOT_ALLOWED' | ''
}

export interface IMigrationStatus {
  feature: string,
  rollout: false
}