import {Chart as ChartJS, ArcElement, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";

export default function PieChart() {
    const {expensesGlobal} = useContext(ExpensesContext)

    const graphData = expensesGlobal.reduce((acc, expense) => {
            if (expense.paymentFrequency === "ONCE") {
                acc.variable += expense.amount
            } else {
                acc.fixed += expense.amount
            }
            return acc;
        },
        {fixed: 0, variable: 0})

    ChartJS.register(Tooltip, Legend, ArcElement)

    const data = {
        labels: ["Fixed", "Variable"],

        datasets: [
            {
                label: "Expenses",
                data: [graphData.fixed, graphData.variable],
                backgroundColor: ["rgba(54, 162, 285, 0.3)", "rgba(75, 212, 192, 0.3)"],
                borderColor: ["rgba(54, 162, 285)", "rgba(75, 212, 192)"],
                borderWidth: 1,
                hoverOffset: 4,
            }
        ]
    }

    return (
        <>
            <Pie data={data}/>
        </>
    )
}