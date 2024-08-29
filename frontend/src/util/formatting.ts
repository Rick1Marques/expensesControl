export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "EUR",
});

export function formatDate(date: string): string {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}