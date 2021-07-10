"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersNames = void 0;
const axios_1 = __importDefault(require("axios"));
var OrdersNames;
(function (OrdersNames) {
    OrdersNames["MCSold"] = "item_sold_minecraft";
    OrdersNames["MCPreCard"] = "prepaid_card_redeemed_minecraft";
    OrdersNames["CobaltSold"] = "item_sold_cobalt";
    OrdersNames["CobaltPreCard"] = "prepaid_card_redeemed_cobalt";
    OrdersNames["ScrollsSold"] = "item_sold_scrolls";
    OrdersNames["DungeonsSold"] = "item_sold_dungeons";
})(OrdersNames = exports.OrdersNames || (exports.OrdersNames = {}));
class MojangAPI {
    static getOrdersStats(...orders) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {
                metricKeys: orders
            };
            let data = {
                total: 0,
                last24h: 0,
                saleVelocityPerSeconds: 0
            };
            let error = '';
            try {
                let p = yield axios_1.default.post('https://api.mojang.com/orders/statistics', JSON.stringify(body), {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                data = p.data;
            }
            catch (e) {
                error = e.response.data;
            }
            return [error, data];
        });
    }
    static getOrdersStatsSync(orders, callback) {
        let body = {
            metricKeys: orders
        };
        let data = {
            total: 0,
            last24h: 0,
            saleVelocityPerSeconds: 0
        };
        let error = '';
        axios_1.default.post('https://api.mojang.com/orders/statistics', JSON.stringify(body), {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            data = res.data;
        }).catch(e => {
            error = e.response.data;
        }).finally(() => {
            callback(error, data);
        });
    }
    static getBlockedServers(maxlength) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            let p = yield axios_1.default.get('https://sessionserver.mojang.com/blockedservers');
            data = p.data.split('\n', maxlength);
            return [data];
        });
    }
    static getBlockedServersSync(arg0, arg1) {
        let data = [];
        axios_1.default.get('https://sessionserver.mojang.com/blockedservers').then(res => {
            data = res.data.split('\n', (typeof arg0 === 'number' ? arg0 : undefined));
        }).finally(() => {
            if (typeof arg0 === 'number') {
                if (arg1)
                    arg1(data);
            }
            else {
                arg0(data);
            }
        });
    }
    static isUsernameAvailable(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let p = yield axios_1.default.get('https://account.mojang.com/available/minecraft/' + username);
            return [p.data];
        });
    }
    static isUsernameAvailableSync(username, callback) {
        axios_1.default.get('https://account.mojang.com/available/minecraft/' + username).then(res => {
            callback(res.data);
        });
    }
    static getUUID(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                name: '',
                id: ''
            };
            let muldata = [];
            let error = '';
            try {
                if (typeof username === 'string') {
                    let p = yield axios_1.default.get('https://api.mojang.com/users/profiles/minecraft/' + username);
                    data = p.data;
                }
                else {
                    let p = yield axios_1.default.post('https://api.mojang.com/profiles/minecraft', JSON.stringify(username), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    p.data.forEach((d) => {
                        muldata.push(d);
                    });
                }
            }
            catch (e) {
                error = e.response.data;
            }
            if (typeof username === 'string') {
                return [error, data];
            }
            else {
                return [error, muldata];
            }
        });
    }
    static getUUIDSync(username, callback) {
        let data = {
            name: '',
            id: ''
        };
        let muldata = [];
        let error = '';
        if (typeof username === 'string') {
            axios_1.default.get('https://api.mojang.com/users/profiles/minecraft/' + username).then(res => {
                data = res.data;
            }).catch(e => {
                error = e.response.data;
            }).finally(() => {
                callback(error, data);
            });
        }
        else {
            axios_1.default.post('https://api.mojang.com/profiles/minecraft', JSON.stringify(username), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                res.data.forEach((d) => {
                    muldata.push(d);
                });
            }).catch(e => {
                error = e.response.data;
            }).finally(() => {
                callback(error, muldata);
            });
        }
    }
    static getUsername(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                name: '',
                id: ''
            };
            let error = '';
            try {
                let p = yield axios_1.default.get('https://api.mojang.com/user/profile/' + uuid);
                data = p.data;
            }
            catch (e) {
                error = e.response.data;
            }
            return [error, data];
        });
    }
    static getUsernameSync(uuid, callback) {
        let data = {
            name: '',
            id: ''
        };
        let error = '';
        axios_1.default.get('https://api.mojang.com/user/profile/' + uuid).then(res => {
            data = res.data;
        }).catch(e => {
            error = e.response.data;
        }).finally(() => {
            callback(error, data);
        });
    }
    static getUserProfile(uuid, decoded) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                id: '',
                name: '',
                properties: []
            };
            let datadec = {
                id: '',
                name: '',
                properties: []
            };
            let error = '';
            try {
                let p = yield axios_1.default.get('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid);
                data = p.data;
                if (decoded) {
                    datadec = p.data;
                    data.properties.forEach((prop, i) => {
                        datadec.properties[i].value = JSON.parse(Buffer.from(prop.value, 'base64').toString('utf-8'));
                    });
                }
            }
            catch (e) {
                error = e.response.data;
            }
            if (decoded) {
                return [error, datadec];
            }
            else {
                return [error, data];
            }
        });
    }
    static getUserProfileSync(uuid, decoded = false, callback) {
        let data = {
            id: '',
            name: '',
            properties: []
        };
        let datadec = {
            id: '',
            name: '',
            properties: []
        };
        let error = '';
        axios_1.default.get('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid).then(res => {
            data = res.data;
            if (decoded) {
                datadec = res.data;
                data.properties.forEach((prop, i) => {
                    datadec.properties[i].value = JSON.parse(Buffer.from(prop.value, 'base64').toString('utf-8'));
                });
            }
        }).catch(e => {
            error = e.response.data;
        }).finally(() => {
            callback(error, decoded ? datadec : data);
        });
    }
    static getProfileHistory(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            let error = '';
            try {
                let p = yield axios_1.default.get('https://api.mojang.com/user/profiles/' + uuid + '/names');
                data = p.data;
            }
            catch (e) {
                error = e.response.data;
            }
            return [error, data];
        });
    }
    static getProfileHistorySync(uuid, callback) {
        let data = [];
        let error = '';
        axios_1.default.get('https://api.mojang.com/user/profiles/' + uuid + '/names').then(res => {
            data = res.data;
        }).catch(e => {
            error = e.response.data;
        }).finally(() => {
            callback(error, data);
        });
    }
    static mojangAccountAuth(username, password, requestUser = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                accessToken: '',
                clientToken: '',
                availableProfiles: [],
                selectedProfile: {
                    name: '',
                    id: ''
                }
            };
            let error = '';
            try {
                let p = yield axios_1.default.post('https://authserver.mojang.com/authenticate', JSON.stringify({
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
                });
                data = p.data;
            }
            catch (e) {
                error = e.response.data;
            }
            return [error, data];
        });
    }
    static decodeJWT(token, type) {
        let base64Text = token.split('.')[1];
        let text = Buffer.from(base64Text, 'base64').toString();
        let a = JSON.parse(text);
        return type === 'MSA' ? a : a;
    }
    static getsFTTagurlPost(text) {
        var _a;
        let i = text.indexOf('sFTTag:\'');
        let j = text.indexOf('/>\'', i);
        let a = text.substring(i + 8, j + 2);
        a = (_a = a.match('value="(.+?)"')) === null || _a === void 0 ? void 0 : _a.values().next().value.replace('value="', '');
        a = a.substring(0, a.length - 1);
        let i1 = text.indexOf('urlPost:\'');
        let j1 = text.indexOf('\',', i1);
        let b = text.substring(i1 + 9, j1);
        return [a, b];
    }
    static usernameAvailability(username, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                status: ''
            };
            let error = '';
            try {
                let p = yield axios_1.default.get('https://api.minecraftservices.com/minecraft/profile/name/' + username + '/available', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                data = p.data;
            }
            catch (e) {
                error = e.response.data;
            }
            return [error, data];
        });
    }
    static usernameAvailabilitySync(username, token, callback) {
        let data = {
            status: ''
        };
        let error = '';
        axios_1.default.get('https://api.minecraftservices.com/minecraft/profile/name/' + username + '/available', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            data = res.data;
        }).catch(e => {
            error = e.response.data;
        }).finally(() => {
            callback(error, data);
        });
    }
    static checkMigrationStatus(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let p = yield axios_1.default.get('https://api.minecraftservices.com/rollout/v1/msamigration', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            return [p.data];
        });
    }
    static checkMigrationStatusSync(token, callback) {
        axios_1.default.get('https://api.minecraftservices.com/rollout/v1/msamigration', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            callback(res.data);
        });
    }
}
exports.default = MojangAPI;
//# sourceMappingURL=index.js.map