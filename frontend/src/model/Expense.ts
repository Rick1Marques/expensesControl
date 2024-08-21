export type Expense = {
    id: string,
    category: string,
    vendor: string,
    amount: number,
    isCashPayment: boolean,
    description: string,
    date: string
    paymentFrequency: "ONCE" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "BIANNUAL" | "YEARLY"
}