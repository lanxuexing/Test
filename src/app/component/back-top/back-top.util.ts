export function _isNumberValue(value: any): boolean {
    return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}
