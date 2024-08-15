
// @MongoId
// String id,
//     String category,
//     String vendor,
//     double amount,
//     boolean isCashPayment,
//     String description,
//     LocalDate date

export type Expense = {
    id:string;
    category:string;
    vendor:string;
    amount: number;
    isCashPayment: boolean;
    description: string;
    date: Date;
}