import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(updateLocale);
dayjs.updateLocale('vi', {
    weekdaysShort: 'CN_TH 2_TH 3_TH 4_TH 5_TH 6_TH 7'.split('_'),
    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    months: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split(
        '_'
    ),
    weekdays: 'Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy'.split(
        '_'
    ),
});
dayjs.extend(localizedFormat);
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

export const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

    let currentMonthCount = 0 - firstDayOfTheMonth;
    let rows = firstDayOfTheMonth + dayjs(month).daysInMonth() > 35 ? 6 : 5;
    const daysMatrix = new Array(rows).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });

    return daysMatrix;
};

export const getMonthSmall = (month = dayjs().month()) => {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });

    return daysMatrix;
};
