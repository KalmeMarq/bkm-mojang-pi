import axios from 'axios'
import { IAuthMojangData, IAvailabilityData, IAvailabilityErrorMessage, IErrorMessage, IGetUsernameData, IGetUUIDData, IMigrationStatus, IMSAToken, IOrdersData, IProfileHistory, ISessionProfile, ISessionProfileDecoded, IUserAvailability, IYggdrasilToken, OrdersNames } from './types'

export default class MojangAPI {
  public static async getOrdersStats(...orders: OrdersNames[]): Promise<[IErrorMessage, IOrdersData]> {
    let body = {
      metricKeys: orders
    }

    let data: IOrdersData = {
      total: 0,
      last24h: 0,
      saleVelocityPerSeconds: 0
    }

    let error: IErrorMessage = ''

    try {
      let p = await axios.post('https://api.mojang.com/orders/statistics', JSON.stringify(body), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      data = p.data
    } catch(e) {
      error = e.response.data
    }

    return [error, data]
  }

  public static getOrdersStatsSync(orders: OrdersNames[], callback: (err: IErrorMessage, data: IOrdersData) => void): void {
    let body = {
      metricKeys: orders
    }

    let data: IOrdersData = {
      total: 0,
      last24h: 0,
      saleVelocityPerSeconds: 0
    }
    let error: IErrorMessage = ''

    axios.post('https://api.mojang.com/orders/statistics', JSON.stringify(body), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
    }).then(res => {
      data = res.data
    }).catch(e => {
      error = e.response.data
    }).finally(() => {
      callback(error, data)
    })
  }

  public static async getBlockedServers(maxlength?: number): Promise<[string[]]>  {
    let data: string[] = []

    let p = await axios.get('https://sessionserver.mojang.com/blockedservers')
    data = (p.data as string).split('\n', maxlength)

    return [data]
  }

  public static getBlockedServersSync(callback: (data: string[]) => void): void
  public static getBlockedServersSync(maxlength: number, callback: (data: string[]) => void): void
  public static getBlockedServersSync(arg0: number | ((data: string[]) => void), arg1?: (data: string[]) => void): void {
    let data: string[] = []

    axios.get('https://sessionserver.mojang.com/blockedservers').then(res => {
      data = (res.data as string).split('\n', (typeof arg0 === 'number' ? arg0 : undefined))
    }).finally(() => {
      if(typeof arg0 === 'number') {
        if(arg1) arg1(data)
      } else {
        arg0(data)
      }
    })
  }

  public static async isUsernameAvailable(username: string): Promise<[IUserAvailability]> {
    let p = await axios.get('https://account.mojang.com/available/minecraft/' + username)
    return [p.data as IUserAvailability]
  }

  public static isUsernameAvailableSync(username: string, callback: (data: IUserAvailability) => void): void {
    axios.get('https://account.mojang.com/available/minecraft/' + username).then(res => {
      callback(res.data)
    })
  }

  public static async getUUID(username: string): Promise<[IErrorMessage, IGetUUIDData]>
  public static async getUUID(username: string[]): Promise<[IErrorMessage, IGetUUIDData[]]>
  public static async getUUID(username: string | string[]): Promise<[IErrorMessage, IGetUUIDData | IGetUUIDData[]]> {
    let data: IGetUUIDData = {
      name: '',
      id: ''
    }

    let muldata: IGetUUIDData[] = []
    let error: IErrorMessage = ''

    try {
      if(typeof username === 'string') {
        let p = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username)
        data = p.data
      } else {
        let p = await axios.post('https://api.mojang.com/profiles/minecraft', JSON.stringify(username), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        p.data.forEach((d: IGetUUIDData) => {
          muldata.push(d)
        })
      }
    } catch(e) {
      error = e.response.data
    }

    if(typeof username === 'string') {
      return [error, data]
    } else {
      return [error, muldata]
    }
  }

  public static getUUIDSync(username: string, callback: (error: IErrorMessage, data: IGetUUIDData) => void): void
  public static getUUIDSync(username: string[], callback: (error: IErrorMessage, data: IGetUUIDData[]) => void): void
  public static getUUIDSync(username: string | string[], callback: ((error: IErrorMessage, data: IGetUUIDData) => void) | ((error: IErrorMessage, data: IGetUUIDData[]) => void)): void {
    let data: IGetUUIDData = {
      name: '',
      id: ''
    }
    let muldata: IGetUUIDData[] = []
    let error: IErrorMessage = ''

    if(typeof username === 'string') {
      axios.get('https://api.mojang.com/users/profiles/minecraft/' + username).then(res => {
        data = res.data
      }).catch(e => {
        error = e.response.data
      }).finally(() => {
        callback(error, data as any)
      })
    } else {
      axios.post('https://api.mojang.com/profiles/minecraft', JSON.stringify(username), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        res.data.forEach((d: IGetUUIDData) => {
          muldata.push(d)
        })
      }).catch(e => {
        error = e.response.data
      }).finally(() => {
        callback(error, muldata as any)
      })
    }
  }

  public static async getUsername(uuid: string): Promise<[IErrorMessage, IGetUUIDData]> {
    let data: IGetUUIDData = {
      name: '',
      id: ''
    }
    let error: IErrorMessage = ''

    try {
      let p = await axios.get('https://api.mojang.com/user/profile/' + uuid)
      data = p.data
    } catch(e) {
      error = e.response.data
    }

    
    return [error, data]
  }

  public static getUsernameSync(uuid: string, callback: (error: IErrorMessage, data: IGetUsernameData) => void): void {
    let data: IGetUsernameData = {
      name: '',
      id: ''
    }
    let error: IErrorMessage = ''

    axios.get('https://api.mojang.com/user/profile/' + uuid).then(res => {
      data = res.data
    }).catch(e => {
      error = e.response.data
    }).finally(() => {
      callback(error, data)
    })
  }

  public static async getUserProfile(uuid: string): Promise<[IErrorMessage, ISessionProfile]>
  public static async getUserProfile(uuid: string, decoded: boolean): Promise<[IErrorMessage, ISessionProfileDecoded]>
  public static async getUserProfile(uuid: string, decoded?: boolean): Promise<[IErrorMessage, ISessionProfile | ISessionProfileDecoded]> {
    let data: ISessionProfile = {
      id: '',
      name: '',
      properties: []
    }
    let datadec: ISessionProfileDecoded = {
      id: '',
      name: '',
      properties: []
    }
    let error: IErrorMessage = ''

    try {
      let p = await axios.get('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid)
      data = p.data

      if(decoded) {
        datadec = p.data
  
        data.properties.forEach((prop, i) => {
          datadec.properties[i].value = JSON.parse(Buffer.from(prop.value, 'base64').toString('utf-8'))
        })
  
      }
    } catch(e) {
      error = e.response.data
    }
    
    if(decoded) {
      return [error, datadec]
    } else {
      return [error, data]
    }
  }

  public static getUserProfileSync(uuid: string, decoded: boolean = false, callback: (error: IErrorMessage, data: ISessionProfile | ISessionProfileDecoded) => void): void {
    let data: ISessionProfile = {
      id: '',
      name: '',
      properties: []
    }
    let datadec: ISessionProfileDecoded = {
      id: '',
      name: '',
      properties: []
    }
    let error: IErrorMessage = ''

    axios.get('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid).then(res => {
      data = res.data

      if(decoded) {
        datadec = res.data
  
        data.properties.forEach((prop, i) => {
          datadec.properties[i].value = JSON.parse(Buffer.from(prop.value, 'base64').toString('utf-8'))
        })
      }
    }).catch(e => {
      error = e.response.data
    }).finally(() => {
      callback(error, decoded ? datadec : data)
    })
  }

  public static async getProfileHistory(uuid: string): Promise<[IErrorMessage, IProfileHistory]> {
    let data: IProfileHistory = []
    let error: IErrorMessage = ''

    try {
      let p = await axios.get('https://api.mojang.com/user/profiles/' + uuid + '/names')
      data = p.data
    } catch(e) {
      error = e.response.data  
    }

    return [error, data]
  }

  public static getProfileHistorySync(uuid: string, callback: (error: IErrorMessage, data: IProfileHistory) => void): void {
    let data: IProfileHistory = []
    let error: IErrorMessage = ''
    
    axios.get('https://api.mojang.com/user/profiles/' + uuid + '/names').then(res => {
      data = res.data
    }).catch(e => {
      error = e.response.data
    }).finally(() => {
      callback(error, data)
    })
  }

  public static async mojangAccountAuth(username: string, password: string, requestUser: boolean = true): Promise<[IErrorMessage, IAuthMojangData]> {
    let data: IAuthMojangData = {
      accessToken: '',
      clientToken: '',
      availableProfiles: [],
      selectedProfile: {
        name: '',
        id: ''
      }
    }
    let error: IErrorMessage = ''

    try {
      let p = await axios.post('https://authserver.mojang.com/authenticate', JSON.stringify({
        agent: {
          name: 'Minecraft'
        },
        username: username,
        password: password,
        requestUser: requestUser
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      data = p.data
    } catch(e) {
      error = e.response.data
    }

    return [error, data]
  }

  public static decodeJWT(token: string, type: 'MSA'): IMSAToken
  public static decodeJWT(token: string, type: 'Yggdrasil'): IYggdrasilToken
  public static decodeJWT(token: string, type: 'MSA' | 'Yggdrasil'): IYggdrasilToken | IMSAToken {
    let base64Text = token.split('.')[1]
    let text = Buffer.from(base64Text, 'base64').toString()
    let a = JSON.parse(text)
    return type === 'MSA' ? a as IMSAToken : a as IYggdrasilToken
  }

  private static getsFTTagurlPost(text: string): [string, string] {
    let i = text.indexOf('sFTTag:\'')
    let j = text.indexOf('/>\'', i)
    let a = text.substring(i + 8, j + 2)
    a = a.match('value="(.+?)"')?.values().next().value.replace('value="', '')
    a = a.substring(0, a.length - 1)
    
    let i1 = text.indexOf('urlPost:\'')
    let j1 = text.indexOf('\',', i1)
    let b = text.substring(i1 + 9, j1)

    return [a, b]
  }

  public static async usernameAvailability(username: string, token: string): Promise<[IAvailabilityErrorMessage, IAvailabilityData]> {
    let data: IAvailabilityData = {
      status: ''
    }
    let error: IAvailabilityErrorMessage = ''

    try {
      let p = await axios.get('https://api.minecraftservices.com/minecraft/profile/name/' + username + '/available', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      data = p.data
    } catch(e) {
      error = e.response.data
    }

    return [error, data]
  }

  public static usernameAvailabilitySync(username: string, token: string, callback: (error: IAvailabilityErrorMessage, data: IAvailabilityData) => void): void {
    let data: IAvailabilityData = {
      status: ''
    }
    let error: IAvailabilityErrorMessage = ''

    axios.get('https://api.minecraftservices.com/minecraft/profile/name/' + username + '/available', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      data = res.data
    }).catch(e => {
      error = e.response.data
    }).finally(() => {
      callback(error, data)
    })
  }

  public static async checkMigrationStatus(token: string): Promise<[IMigrationStatus]> {
    let p = await axios.get('https://api.minecraftservices.com/rollout/v1/msamigration', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    return [p.data as IMigrationStatus]
  }

  public static checkMigrationStatusSync(token: string, callback: (data: IMigrationStatus) => void): void {
    axios.get('https://api.minecraftservices.com/rollout/v1/msamigration', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      callback(res.data)
    })
  }
}