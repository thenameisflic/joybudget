import { format } from "date-fns";

const locales = {
  pt: require("date-fns/locale/pt"),
  en: require("date-fns/locale/en")
};

export function sorted(arr, comparator) {
  return [...arr].sort(comparator);
}

export function unique(arr) {
  return arr.filter((v, idx) => arr.indexOf(v) === idx);
}

export function formatDate(date, formatStr) {
  return format(date, formatStr, { locale: locales["en"] });
}

export function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

export function areSameDay(d1, d2) {
  return d1.getUTCFullYear() === d2.getUTCFullYear() &&
         d1.getUTCMonth() === d2.getUTCMonth() &&
         d1.getUTCDate() === d2.getUTCDate();
}

export function areSameMonth(d1, d2) {
  return d1.getUTCFullYear() === d2.getUTCFullYear() &&
         d1.getUTCMonth() === d2.getUTCMonth();
}

export function areSameWeek(d1, d2) {
  return d1.getUTCFullYear() === d2.getUTCFullYear() &&
         d1.getUTCMonth() === d2.getUTCMonth() &&
         getWeekNumber(d1) === getWeekNumber(d2);
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}
