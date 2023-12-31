export default class CurrencyUtils
{
    static readonly USD: string = 'USD';
    static readonly EUR: string = 'EUR';
    static readonly BRL: string = 'BRL';
    static readonly JPY: string = 'JPY';

    static format(amount: number, currency: string, locale: string = 'pt-BR'): string {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
    }

    static formatBRL(amount: number): string {
        return CurrencyUtils.format(amount, CurrencyUtils.BRL, 'pt-BR');
    }

    static limitDecimals(amount: number, decimals: number = 2): string {
        return amount.toFixed(decimals);
    }

    static convert(amount: number, fromRate: number, toRate: number): number {
        return amount * (toRate / fromRate);
    }

    static round(amount: number, decimals: number = 2): number {
        const factor = Math.pow(10, decimals);
        return Math.round(amount * factor) / factor;
    }

    static addTax(amount: number, taxRate: number): number {
        return amount * (1 + taxRate / 100);
    }

    static subtractTax(amount: number, taxRate: number): number {
        return amount / (1 + taxRate / 100);
    }

    static parseCurrency(amount: string): number {
        const normalizedAmount = amount.replace(/[^\d.-]/g, '');
        return parseFloat(normalizedAmount);
    }

    static addFormatted(value1: string, value2: string, currency: string, locale: string = 'en-US'): string {
        const num1 = CurrencyUtils.parseCurrency(value1);
        const num2 = CurrencyUtils.parseCurrency(value2);
        const sum = num1 + num2;
        return CurrencyUtils.format(sum, currency, locale);
    }

    static subtractFormatted(value1: string, value2: string, currency: string, locale: string = 'en-US'): string {
        const num1 = CurrencyUtils.parseCurrency(value1);
        const num2 = CurrencyUtils.parseCurrency(value2);
        const difference = num1 - num2;
        return CurrencyUtils.format(difference, currency, locale);
    }
}
