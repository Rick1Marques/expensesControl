import {Expense} from "../model/Expense.ts";

type Group = { name: string; totalAmount: number; totalEntries: number }
type GroupType = "vendor" | "category" | "date" ;

export function groupExpenses(groupType: GroupType, data: Expense[]) {
    const groupedExpenses = data.reduce((acc, expense) => {
        const key: string = expense[groupType];
        if (!acc[key]) {
            acc[key] = {name: key, totalAmount: 0, totalEntries: 0};
        }
        acc[key].totalAmount += expense.amount;
        acc[key].totalEntries += 1;

        return acc;

    }, {} as Record<string, Group>);

    return Object.values(groupedExpenses);

}