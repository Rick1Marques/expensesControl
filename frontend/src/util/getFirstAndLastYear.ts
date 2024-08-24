import {Expense} from "../model/Expense.ts";

export function getFirstAndLastYear(data: Expense[]) {
    if (data.length === 0) {
        return {firstYear: new Date().getFullYear(), lastYear: new Date().getFullYear()};
    }

    const sortedExpenses = [...data].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
    });

    const firstYear = new Date(sortedExpenses[0].date).getFullYear();
    const lastYear = new Date(sortedExpenses[sortedExpenses.length - 1].date).getFullYear();
    return {firstYear, lastYear};
}