import { AppRoutes } from "./config/routes";
import { IUserCreditRatePromo } from "./types/user";

export const NAV_LINKS = [
  AppRoutes.HowToGet,
  AppRoutes.HowToRepay,
  AppRoutes.CreditCostCalculation,
  AppRoutes.News,
  AppRoutes.Documents,
  AppRoutes.Contacts,
];

export const BOT_LINK = "https://t.me/Azpulmat_bot";
export const INSTAGRAM_LINK = "https://www.instagram.com/azpulmat_promo.az/";
export const POST_ADDRESS = "info@azpulmat.az";
export const CALL_CENTER_NUMBER = "1670";
export const CALL_CENTER_NUMBER_2 = "0123105004";

export const APP_LINK = "https://onelink.to/2pnshe";
export const APK_LINK = "https://api.azpul.az/application/downloadApk";
export const APP_STORE_LINK =
  "https://apps.apple.com/kz/app/azpulmat/id6461821655";
export const PLAY_MARKET_LINK =
  "https://play.google.com/store/apps/details?id=com.azpul.android&referrer=af_tranid%3DppcTq6XI6jM6JofmOHptmw%26c%3Dsite_calcul%26pid%3Dsite_calcul";

export const SIMA_LINK = "https://onelink.to/jk89ak";
export const SIMA_APP_STORE_LINK =
  "https://apps.apple.com/az/app/si-ma-r%C9%99q%C9%99msal-i-mza/id1602500636";
export const SIMA_PLAY_MARKET_LINK =
  "https://play.google.com/store/apps/details?id=az.dpc.sima";

export const DEFAULT_LOCALE = "az";

/// common credit
export const DAYS_WHEN_COMMISSION_FOR_CREDIT_NOT_CHARGED = 5;
export const CREDIT_SUM_STEP = 10;
export const CREDIT_DAYS_PROMO = 15;
///

/// consumer credit
export const DEFAULT_CONSUMER_CREDIT_SUM = 100;
export const DEFAULT_CONSUMER_CREDIT_DAYS = 30;
export const MIN_CONSUMER_CREDIT_SUM = 50;
export const MAX_CONSUMER_CREDIT_SUM = 1500;
export const CONSUMER_CREDIT_DAILY_RATE = 0.5;

export const CONSUMER_CREDIT_RATE: IUserCreditRatePromo = {
  sumMin: MIN_CONSUMER_CREDIT_SUM,
  sumMax: MAX_CONSUMER_CREDIT_SUM,
  sumIncrementValue: CREDIT_SUM_STEP,
  daysDefault: DEFAULT_CONSUMER_CREDIT_DAYS,
  sumDefault: DEFAULT_CONSUMER_CREDIT_SUM,
};
///

/// daily credit
export const DEFAULT_DAILY_CREDIT_SUM = 310;
export const DEFAULT_DAILY_CREDIT_DAYS = 45;
export const DAILY_CREDIT_DAILY_RATE = 0.3;
export const MIN_DAILY_CREDIT_SUM = 20;
export const MAX_DAILY_CREDIT_SUM = 500;

export const DAILY_CREDIT_RATE: IUserCreditRatePromo = {
  sumMin: MIN_DAILY_CREDIT_SUM,
  sumMax: MAX_DAILY_CREDIT_SUM,
  sumIncrementValue: CREDIT_SUM_STEP,
  daysDefault: DEFAULT_DAILY_CREDIT_DAYS,
  sumDefault: DEFAULT_DAILY_CREDIT_SUM,
};
///

export const DEFAULT_NEWS_PAGE = 1;
export const DEFAULT_NEWS_LIMIT = 4;
