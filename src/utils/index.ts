import {Log} from '@src/types';
import moment from 'moment';
import {customAlphabet} from 'nanoid';
import {Dimensions, Platform, StatusBar} from 'react-native';

/**
 * 屏幕适配暂时的方案
 * - `iOS`: `pt`
 * - `Android`: `dip`
 * @param px
 * @returns
 */
const useDip = (px: number) =>
  Platform.select({
    android: px,
    ios: Math.round((px * Dimensions.get('screen').width) / 375),
  });

/**
 * 是不是刘海屏
 * @returns
 */
const isiPhoneXSMax = () => {
  const screenHeights = [780, 812, 844, 896, 926];
  const screen = Dimensions.get('screen');
  return (
    Platform.OS == 'ios' &&
    screenHeights.some(it => it == screen.height || it == screen.width)
  );
};

/**
 * 状态栏的高度
 * @param isImmersible Android 平台是否沉浸式
 * @param isSafe iPhone X 刘海高度，如果留白边返回 44，否则返回 34
 * @returns number
 */
const useStatusBarHeight = (isImmersible: boolean, isSafe?: boolean) => {
  return Platform.select({
    android: isImmersible ? StatusBar.currentHeight : 0,
    ios: isiPhoneXSMax() ? (isSafe ? 44 : 34) : 20,
  });
};

/**
 * Home Indicator 的高度
 * @returns number
 */
const useHomeIndicatorHeight = () => {
  return isiPhoneXSMax() ? 34 : 0;
};

const useGoogleColors = {
  red: {name: '嫣红', dark: '#e74b44', light: '#fcdcdd'},
  orange: {name: '橘橙', dark: '#f57c1f', light: '#fee7d5'},
  yellow: {name: '明黄', dark: '#fdbc0a', light: '#fff3d1'},
  olive: {name: '橄榄', dark: '#8ec541', light: '#fcf4db'},
  green: {name: '森绿', dark: '#3ab54b', light: '#d9f0df'},
  cyan: {name: '天青', dark: '#1ebcb6', light: '#d4f2f4'},
  blue: {name: '海蓝', dark: '#0282ff', light: '#cfe7ff'},
  purple: {name: '姹紫', dark: '#6938b9', light: '#e2d7f3'},
  mauve: {name: '木槿', dark: '#9e28b2', light: '#edd4f2'},
  pink: {name: '桃粉', dark: '#e2399a', light: '#fcd7ec'},
  brown: {name: '棕褐', dark: '#a86640', light: '#f0e1dc'},
  grey: {name: '玄灰', dark: '#8899a7', light: '#eaebf1'},
};

/**
 * 阴影
 * @param shadowColor
 * @param shadowOffset
 * @param shadowOpacity
 * @param elevation
 * @returns
 */
const useShadowStyle = (
  shadowColor?: string,
  shadowOffset?: {width: number; height: number},
  shadowOpacity?: number,
  elevation?: number,
) => {
  return {
    shadowColor: shadowColor ?? '#000',
    shadowOffset: shadowOffset ?? {width: 0, height: 1},
    shadowOpacity: shadowOpacity ?? 0.1,
    elevation: elevation ?? 4,
  };
};

/**
 * UUID
 * @param length 默认 32 位
 */
const useUUID = (length?: number) => {
  const ascii = (a: number, b: number) => String.fromCharCode(a + b);
  const idBuilder = customAlphabet(
    Array.from({length: 10}, (_, i) => i.toString())
      .concat(
        Array.from({length: 26}, (_, i) => `${ascii(i, 65)}${ascii(i, 97)}`),
      )
      .join(''),
    length || 32,
  );
  return idBuilder();
};

/**
 * 日期格式化
 * @param time 默认当前时间
 * @param format 时间格式
 * @returns
 */
const useTimeFormatter = (time?: string, format?: string) =>
  (time ? moment(time) : moment()).format(format || 'YYYY-MM-DD HH:mm:ss');

/**
 *
 * @param array 数据源
 * @param sort 1: 升序 -1: 降序
 * @param keyOfTime
 */
const useSortedByTime = (array: any[], sort?: 1 | -1, keyOfTime?: string) => {
  const key = keyOfTime || 'time';
  const s = sort ?? -1;
  return array.sort((a, b) =>
    moment(a[key]).isAfter(moment(b[key])) ? s : -s,
  );
};

const useMomentChinaConfig = {
  months: '一二三四五六七八九十'
    .split('')
    .concat(['十一', '十二'])
    .map(it => `${it}月`),
  monthsShort: Array.from({length: 10}, (_, i) => i + 1)
    .concat([11, 12])
    .map(it => `${it}月`),
  weekdays: '日一二三四五六'.split('').map(it => `星期${it}`),
  weekdaysShort: '日一二三四五六'.split('').map(it => `周${it}`),
  weekdaysMin: '日一二三四五六'.split(''),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm',
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function (hour, minute, isLower) {
    const hm = hour * 100 + minute;
    return hm < 600
      ? '凌晨'
      : hm < 900
      ? '早上'
      : hm < 1130
      ? '上午'
      : hm < 1230
      ? '中午'
      : hm < 1800
      ? '下午'
      : '晚上';
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年',
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
};

export {
  useDip,
  isiPhoneXSMax,
  useHomeIndicatorHeight,
  useStatusBarHeight,
  useGoogleColors,
  useShadowStyle,
  useUUID,
  useTimeFormatter,
  useSortedByTime,
  useMomentChinaConfig
};
