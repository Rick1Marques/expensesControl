export type ExpenseDto = {
    category: string,
    vendor: string,
    amount: number,
    isCashPayment: boolean,
    description: string,
    date: string
    paymentFrequency: "ONCE" | "WEEKLY" | "MONTHLY" | "YEARLY"
}