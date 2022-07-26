import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    data: [
      {
        id: "2",
        0: "2",
        grab_order: "20",
        1: "20",
        commission_percent: "2.5",
        2: "2.5",
        marketName: "Amazon",
        3: "Amazon",
        packName: "VIP2",
        4: "VIP2",
        image:
          "https://www.cnet.com/a/img/resize/4d95541ff156f67395fee8dddcd4c200b48c8a34/2016/08/26/c8e11e53-a7cb-484d-b038-77da64e9da56/amazon-campus-store-penn-1.jpg?auto=webp&fit=crop&height=630&width=1200",
        5: "https://www.cnet.com/a/img/resize/4d95541ff156f67395fee8dddcd4c200b48c8a34/2016/08/26/c8e11e53-a7cb-484d-b038-77da64e9da56/amazon-campus-store-penn-1.jpg?auto=webp&fit=crop&height=630&width=1200",
      },
      {
        id: "3",
        0: "3",
        grab_order: "20",
        1: "20",
        commission_percent: "3",
        2: "3",
        marketName: "ebay",
        3: "ebay",
        packName: "VIP3",
        4: "VIP3",
        image:
          "https://www.cnet.com/a/img/resize/4d95541ff156f67395fee8dddcd4c200b48c8a34/2016/08/26/c8e11e53-a7cb-484d-b038-77da64e9da56/amazon-campus-store-penn-1.jpg?auto=webp&fit=crop&height=630&width=1200",
        5: "https://www.cnet.com/a/img/resize/4d95541ff156f67395fee8dddcd4c200b48c8a34/2016/08/26/c8e11e53-a7cb-484d-b038-77da64e9da56/amazon-campus-store-penn-1.jpg?auto=webp&fit=crop&height=630&width=1200",
      },
    ],
  },
  reducers: {
    updateSummary: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [
      {
        "id": "1",
        "0": "1",
        "invite": "0",
        "1": "0",
        "username": "loading",
        "2": "loading",
        "password": "7fad5c003cba1be385fcb48e00e0e756",
        "3": "7fad5c003cba1be385fcb48e00e0e756",
        "secret_key": "null",
        "4": "",
        "name": "null",
        "5": "",
        "main_balance": 0,
        "6": "0",
        "usdt_address": "",
        "7": "",
        "refer": "",
        "8": "",
        "phone": "",
        "9": "",
        "joindate": "2022-07-25 16:25:52",
        "10": "2022-07-25 16:25:52",
        "block": "0",
        "11": "0",
        "app": "null",
        "12": "null",
        "packid": "1",
        "13": "1",
        "total_grab": "0",
        "14": "0",
        "lastGrabTime": "2022-07-25 16:25:52",
        "15": "2022-07-25 16:25:52",
        "lifeGrab": "0",
        "16": "0",
        "spinLeft": "0",
        "17": "10",
        "reduceRefer": "0",
        "18": "0"
      },
    ],
  },
  reducers: {
    updateUser: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const teamreportSlice = createSlice({
  name: "reports",
  initialState: {
    reports: {},
  },

  reducers: {
    updateTeamReports: (state, action) => ({
      ...state,
      reports: action.payload,
    }),
  },
});
export const dashboardmessageSlice = createSlice({
  name: "dashboardmessage",
  initialState: {
    message: {},
  },

  reducers: {
    updateDashboardMessage: (state, action) => ({
      ...state,
      message: action.payload,
    }),
  },
});

export const teamdepositSlice = createSlice({
  name: "deposit",
  initialState: {
    deposit: [
      {
        id: "1",
        0: "1",
        invite: "03985093485",
        1: "03985093485",
        username: "sohan",
        2: "sohan",
        email: "sohan@gmail.com",
        3: "sohan@gmail.com",
        password: "829e4a4a102526021855e3744bd8a86f",
        4: "829e4a4a102526021855e3744bd8a86f",
        secret_key: "1234",
        5: "1234",
        name: "O",
        6: "O",
        vip1_orders: "0",
        7: "0",
        main_balance: "108.243216",
        8: "108.243216",
        vip2_orders: "3",
        9: "0",
        vip3_orders: "",
        10: "0",
        telegram: "329084935",
        11: "329084935",
        whatsapp: "234567",
        12: "234567",
        vip4_orders: "0",
        13: "0",
        vip5_orders: "0",
        14: "0",
        refer: "TheoRpo",
        15: "TheoRpo",
        vip6_orders: "0",
        16: "0",
        phone: "45656",
        17: "45656",
        joindate: "2022-02-12 06:54:55",
        18: "2022-02-12 06:54:55",
        vip7_orders: "0",
        19: "0",
        dateofbirth: "",
        20: "",
        vip8_orders: "0",
        21: "0",
        block: "0",
        22: "0",
        vip9_orders: "0",
        23: "0",
        app: "ODI5ZTRhNGExMDI1MjYwMjE4NTVlMzc0NGJkOGE4NmY4MjllNGE0YTEwMjUyNjAyMTg1NWUzNzQ0YmQ4YTg2Zg==",
        24: "ODI5ZTRhNGExMDI1MjYwMjE4NTVlMzc0NGJkOGE4NmY4MjllNGE0YTEwMjUyNjAyMTg1NWUzNzQ0YmQ4YTg2Zg==",
        vip10_orders: "0",
        25: "0",
        ableToWork: "0",
        26: "0",
      },
    ],
  },
  reducers: {
    updateTeamDeposit: (state, action) => ({
      ...state,
      deposit: action.payload,
    }),
  },
});

export const teamwithdrawSlice = createSlice({
  name: "withdraw",
  initialState: {
    withdraw: [],
  },
  reducers: {
    updateTeamWithdraw: (state, action) => ({
      ...state,
      withdraw: action.payload,
    }),
  },
});
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    asset: {
      bid: 1.18136,
      ask: 1.18138,
      spread_diff: 0,
      symbol: "",
      digits: 5,
      currency: "EUR",
      description: "Euro vs US Dollar",
      contract_size: 100000,
      percentage: 0.909,
      instrument: 0,
      volumeMin: 0.001,
      volumeMax: 3000,
      volumeStep: 1,
      tick_size: 0,
      tick_value: 0,
      margin_initial: 0,
      mode: 0,
      profit_mode: 0,
      group: "Forex",
      marketState: 0,
      stops_level: 0,
      lot_currency: "EUR",
      name: "",
      display_name: "AURUSD",
      price: 0,
      popular: true,
      mover: 0,
      img: "",
    },
  },

  reducers: {
    edit: (state, action) => ({
      ...state,
      asset: action.payload,
    }),

    decreaselots: (state, action) =>
      void {
        ...(state.asset.price -= 10),
      },
    increaselots: (state, action) =>
      void {
        ...(state.asset.price += 10),
      },
    increasestoplevel: (state, action) =>
      void {
        ...(state.asset.stops_level += 10),
      },
    decreasestoplevel: (state, action) =>
      void {
        ...(state.asset.stops_level -= 10),
      },
    resetstoplevel: (state, action) =>
      void {
        ...(state.asset.stops_level = 0),
      },
  },
});

export const accessSlice = createSlice({
  name: "access",
  initialState: {
    access: {
      code_token: "",
      recovery_email: "",
      token_identifier: "",

      token: "",
      uuid: "",
    },
  },
  reducers: {
    setAccessTokenUuid: (state, action) => ({
      ...state,
      access: action.payload,
    }),
    logOutandRemoveTokens: (state) => ({
      ...state,
      access: {
        code_token: "",
        recovery_email: "",
        token_identifier: "",

        token: "",
        uuid: "",
      },
    }),
  },
});

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    asset: {
      symbol: "EURUSD",
    },
  },
  reducers: {
    changeChart: (state) => {
      state.asset.symbol = "usa";
    },
  },
});

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    group: "Most Popular",
  },
  reducers: {
    changeGroup: (state, action) => {
      state.group = action.payload;
    },
  },
});

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    settings_opened: false,
  },
  reducers: {
    toggleMenu: (state, action) => {
      state.settings_opened = action.payload;
    },
  },
});

export const mobileMenuSlice = createSlice({
  name: "mobilemenu",
  initialState: {
    mobilemenu: {
      status: false,
      currentView: 2,
    },
  },
  reducers: {
    toggleMobileMenu: (state, action) => ({
      ...state,
      mobilemenu: action.payload,
    }),
    switchMobileView: (state, action) => ({
      ...state,
      mobilemenu: action.payload,
    }),
  },
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      full_name: "John Dev",
      email: "devjohn@igmc.com",
      phone: "+2396068585",
      currency: "USD",
      country: "NG",
    },
  },
  reducers: {
    setProfile: (state, action) => ({
      ...state,
      profile: action.payload,
    }),
  },
});

export const financepanelSlice = createSlice({
  name: "financepanel",
  initialState: {
    financepanel: {
      usedmargin: 0.0,
      stoploss: 0.0,
      profit: 0.0,
    },
  },

  reducers: {
    setFinPanel: (state, action) => ({
      ...state,
      financepanel: action.payload,
    }),
  },
});

export const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: 0.0,
  },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const tradecloseSlice = createSlice({
  name: "tradeclose",
  initialState: {
    transaction_id: "",
  },
  reducers: {
    setTradeCloseId: (state, action) => {
      state.transaction_id = action.payload;
    },
  },
});

export const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [
      {
        open_time: 11111111,
        asset_name: 222222222,
        asset_volume: 333333333333,
        trade_type: 4444444444,
        cost: 555555555555555,
        open_price: 666666666,
        profit: 7777777777,
        leverage: 8888888888,
        stop_loss_value: 8888888888,
        stop_loss_price: 555555555,
        current_price: 4444444444,
        is_trade_open: 333333333333,
        close_time: 222222222,
        symbol: "sytb",
      },

      {
        open_time: 11111111,
        asset_name: 222222222,
        asset_volume: 333333333333,
        trade_type: 4444444444,
        cost: 555555555555555,
        open_price: 666666666,
        profit: 7777777777,
        leverage: 8888888888,
        stop_loss_value: 8888888888,
        stop_loss_price: 555555555,
        current_price: 4444444444,
        is_trade_open: 333333333333,
        close_time: 222222222,
        symbol: "sytb",
      },
    ],
  },
  reducers: {
    updateHistory: (state, action) => ({
      ...state,
      history: action.payload,
    }),
  },
});

export const openpositionSlice = createSlice({
  name: "openposition",
  initialState: {
    openposition: [
      {
        id: 0,
        open_time: 11111111,
        asset_name: 222222222,
        asset_volume: 333333333333,
        trade_type: 4444444444,
        cost: 555555555555555,
        open_price: 666666666,
        profit: 7777777777,
        leverage: 8888888888,
        stop_loss_value: 8888888888,
        stop_loss_price: 555555555,
        current_price: 4444444444,
        is_trade_open: 333333333333,
        close_time: 222222222,
        symbol: "sytb",
      },

      {
        id: 1,
        open_time: 11111111,
        asset_name: 222222222,
        asset_volume: 333333333333,
        trade_type: 4444444444,
        cost: 555555555555555,
        open_price: 666666666,
        profit: 7777777777,
        leverage: 8888888888,
        stop_loss_value: 8888888888,
        stop_loss_price: 555555555,
        current_price: 4444444444,
        is_trade_open: 333333333333,
        close_time: 222222222,
        symbol: "sytb",
      },
    ],
  },
  reducers: {
    updateOpenPosition: (state, action) => ({
      ...state,
      openposition: action.payload,
    }),
  },
});

const reducer = combineReducers({
  summary: summarySlice.reducer,
  user: userSlice.reducer,
  reports: teamreportSlice.reducer,
  deposit: teamdepositSlice.reducer,
  withdraw: teamwithdrawSlice.reducer,
  dashboardmessage: dashboardmessageSlice.reducer,

  order: orderSlice.reducer,
  chart: chartSlice.reducer,
  group: groupSlice.reducer,
  search: searchSlice.reducer,
  menu: menuSlice.reducer,
  mobilemenu: mobileMenuSlice.reducer,
  access: accessSlice.reducer,
  profile: profileSlice.reducer,
  financepanel: financepanelSlice.reducer,
  balance: balanceSlice.reducer,
  openposition: openpositionSlice.reducer,
  history: historySlice.reducer,
  tradeclose: tradecloseSlice.reducer,
});

export const { updateSummary } = summarySlice.actions;
export const { updateUser } = userSlice.actions;
export const { updateTeamReports } = teamreportSlice.actions;
export const { updateTeamDeposit } = teamdepositSlice.actions;
export const { updateTeamWithdraw } = teamwithdrawSlice.actions;
export const { updateDashboardMessage } = dashboardmessageSlice.actions;

export const {
  edit,
  increaselots,
  decreaselots,
  increasestoplevel,
  decreasestoplevel,
  resetstoplevel,
} = orderSlice.actions;
export const { changeChart } = chartSlice.actions;
export const { changeSearch } = searchSlice.actions;
export const { changeGroup } = groupSlice.actions;
export const { toggleMenu } = menuSlice.actions;
export const { toggleMobileMenu, switchMobileView } = mobileMenuSlice.actions;
export const { setAccessTokenUuid } = accessSlice.actions;
export const { setProfile } = profileSlice.actions;
export const { setFinPanel } = financepanelSlice.actions;
export const { setBalance } = balanceSlice.actions;
export const { updateHistory } = historySlice.actions;
export const { updateOpenPosition } = openpositionSlice.actions;
export const { setTradeCloseId } = tradecloseSlice.actions;
export default reducer;
