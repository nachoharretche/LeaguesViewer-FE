export function showDate(date: Date): string {
    return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear();
}
