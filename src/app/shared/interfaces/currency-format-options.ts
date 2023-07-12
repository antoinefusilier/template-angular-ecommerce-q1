/**
 * properties of the CurrencyFormatOptions interface fully complies
 * with the arguments of the built-in pipe "currency"
 * https://angular.io/api/common/CurrencyPipe
 */
export interface CurrencyFormatOptions {
    code?: string;
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean;
    digitsInfo?: string;
    locale?: string;
}
