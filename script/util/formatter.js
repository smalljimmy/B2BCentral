import {getLocale} from './util';

var Numeral = require('numeral');

/* Required Numeral Locales */
require('numeral/locales/chs');
require('numeral/locales/de');
require('numeral/locales/en-au');
require('numeral/locales/en-gb');
require('numeral/locales/es');
require('numeral/locales/es-es');
require('numeral/locales/fr');
require('numeral/locales/fr-ca');
require('numeral/locales/it');
require('numeral/locales/ja');
require('numeral/locales/nl-nl');
require('numeral/locales/pl');
require('numeral/locales/pt-br');
require('numeral/locales/ru');
require('numeral/locales/tr');

export const UNAVAILABLE_DATA = '-';

function currencyCodeToSymbol(code) {
    const currencySymbols = {
        USD: '$', // US Dollar
        EUR: '€', // Euro
        CRC: '₡', // Costa Rican Colón
        GBP: '£', // British Pound Sterling
        ILS: '₪', // Israeli New Sheqel
        INR: '₹', // Indian Rupee
        JPY: '¥', // Japanese Yen
        KRW: '₩', // South Korean Won
        NGN: '₦', // Nigerian Naira
        PHP: '₱', // Philippine Peso
        PLN: 'zł', // Polish Zloty
        PYG: '₲', // Paraguayan Guarani
        THB: '฿', // Thai Baht
        UAH: '₴', // Ukrainian Hryvnia
        VND: '₫', // Vietnamese Dongimport StringUtil from "../../util/stringUtil";
    };
    return currencySymbols[code];
}

export function formatNumberShort(n) {
    if (n === null || n === undefined) {
        return UNAVAILABLE_DATA;
    }	
    
    setNumeralLocale(Numeral); 
    return n < 1000 ? Numeral(n).format('0a') : Numeral(n).format('0.0a'); 	
}

/**
 * Formats the number 1004 as $1K. If n exceeds 1B it will switch to formatAsCurrency.
 * @param n the number that needs to be formatted.
 * @returns a string of format $1K. If n exceeds 1B it will switch to formatAsCurrency.
 */
export function formatAsCurrencyShort(currency) {
    if (currency === null || currency === undefined) {
        return UNAVAILABLE_DATA;
    }		

    return currencyCodeToSymbol(currency.currencyCode) + formatNumberShort(currency.currencyAmount);
}

export function formatAsPercentage(item, total, isCurrency) {
	var floor = Math.floor;
	
	if (isCurrency) {
		return floor(floor(item.currencyAmount)/total.currencyAmount*100);
	}
	return floor(floor(item)/total*100);
}

export function formatNumber(n) {
    if (n === null || n === undefined) {
        return UNAVAILABLE_DATA;
    }
    if (typeof n === "string") {
        n = Number.parseFloat(n);
    }
    const locale = getLocale() || undefined;
    return n.toLocaleString(locale);
}

export function formatNumberToFixed(n, fixedPlaces) {
    if (n === null || n === undefined) {
        return UNAVAILABLE_DATA;
    }
    const options = { minimumFractionDigits:fixedPlaces, maximumFractionDigits:fixedPlaces };
    const locale = getLocale() || undefined;
    return n.toLocaleString(locale, options);
}

export function setNumeralLocale(Numeral) {
    const numeralMap = {
        "de-DE": "de",
        "en-CA": "fr-ca",
        "en-GB": "en-gb",
        "en-IN": "en", /* NOTE: Fix this, Indian Numerals are not suppported by Numeral */
        "en-US": "en",
        "es-ES": "es-es",
        "es-MX": "en",
        "fr-CA": "fr-ca",
        "fr-FR": "fr",
        "it-IT": "it",
        "ja-JP": "ja",
        "nl-NL": "nl-nl",
        "pl-PL": "pl",
        "pt-BR": "pt-br",
        "tr-TR": "tr",
        "zh-CN": "chs",
        "en-AU": "en-au",
        "es-US": "es",
        "ru-RU": "ru",
    };
    Numeral.locale(numeralMap[getLocale() || 'en-US']);
}