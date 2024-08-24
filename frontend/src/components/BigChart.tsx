import {Bar} from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {groupExpenses} from "../util/groupExpenses.ts";
import {getFirstAndLastYear} from "../util/getFirstAndLastYear.ts";


export default function BigChart() {
    const {expensesGlobal, timeRange, refDate} = useContext(ExpensesContext)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const months = ["January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"]

    let labels: string[] = [];
    let amounts: number[] = [];
    let label: string = ""

    function getAmounts() {
        return groupExpenses("date", expensesGlobal)
    }

    switch (timeRange) {
        case "WEEK":
            labels = weekDays
            amounts = labels.map(day => {
                const dayExpenses = getAmounts().find(g => new Date(g.name).toLocaleDateString('en-US', {weekday: 'long'}) === day);
                return dayExpenses ? dayExpenses.totalAmount : 0;
            });
            label = "$ / day"
            break;
        case "MONTH": {
            const year = new Date(refDate!).getFullYear()
            const month = new Date(refDate!).getMonth()
            const days = new Date(year, month, 0).getDate()
            for (let i = 1; i <= days; i++) {
                labels.push(i.toString())
            }
            amounts = labels.map(day => {
                const dayExpenses = getAmounts().find(g => new Date(g.name).getDate() === parseInt(day));
                return dayExpenses ? dayExpenses.totalAmount : 0;
            })
            label = "$ / day"
        }
            break;
        case "YEAR":
            labels = months
            amounts = labels.map((_month, index) => {
                const monthExpenses = getAmounts().filter(g => new Date(g.name).getMonth() === index);
                return monthExpenses.reduce((acc, e) => acc + e.totalAmount, 0);
            });
            label = "$ / month"
            break
        case "ALL": {
            const firstYear = getFirstAndLastYear(expensesGlobal).firstYear
            const lastYear = getFirstAndLastYear(expensesGlobal).lastYear
            for (let i = firstYear; i <= lastYear; i++) {
                labels.push(i.toString())
            }
            amounts = labels.map(year => {
                const yearExpenses = getAmounts().filter(g => new Date(g.name).getFullYear() === parseInt(year));
                return yearExpenses.reduce((acc, e) => acc + e.totalAmount, 0);
            });
            label = "$ / year"
        }
            break;
    }


    const data = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: amounts,
                backgroundColor: "rgba(54, 162, 285, 0.3)",
                borderColor: "rgb(54, 162, 285)",
                borderWidth: 1,
            }
        ]
    }



    return (
        <>
            <Bar data={data}/>
        </>
    )
}