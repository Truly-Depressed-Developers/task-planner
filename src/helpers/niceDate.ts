export function niceDate(timestamp: number): string {
    const date = new Date(timestamp);

    return date.getDate().toString().padStart(2, '0') +
        "." +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        "." +
        date.getFullYear().toString()
}