export type Expense = {
    id: string,
    category: string,
    vendor: string,
    amount: number,
    isCashPayment: boolean,
    description: string,
    date: string
    paymentFrequency: "once" | "weekly" | "monthly" | "quarterly" | "biannual" | "yearly"
}