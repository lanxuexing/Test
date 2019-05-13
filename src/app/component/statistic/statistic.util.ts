export function padStart(toPad: string, length: number, element: string): string {
    if (toPad.length > length) {
        return toPad;
    }

    const joined = `${getRepeatedElement(length, element)}${toPad}`;
    return joined.slice(joined.length - length, joined.length);
}

export function getRepeatedElement(length: number, element: string): string {
    return Array(length)
        .fill(element)
        .join('');
}

export const timeUnits: Array<[string, number]> = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1] // million seconds
];
