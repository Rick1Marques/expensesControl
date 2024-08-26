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
import {Expense} from "../model/Expense.ts";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {groupExpenses} from "../util/groupExpenses.ts";
import {getFirstAndLastYear} from "../util/getFirstAndLastYear.ts";
import {getColor} from "../util/getcolor.ts";

type DataSet = {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
}
type GroupTypeFilter = "vendor" | "category" | "date" | "expenses";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function BigChart() {
    const {expensesGlobal, timeRange, refDate, selectedGroupsFilter} = useContext(ExpensesContext)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    let labels: string[] = [];
    let expensesData: number[];
    const chartDataSets: DataSet[] = []

    function getGroupInfos(groupType: GroupTypeFilter) {
        if (groupType === "expenses") {
            return
        }
        return groupExpenses(groupType, expensesGlobal)
    }

    function createDataSetForGroup(label: string, data: number[], colors: string[]) {
        return {
            label: label,
            data: data,
            backgroundColor: colors[0],
            borderColor: colors[1],
            borderWidth: 1,
        };
    }

    switch (timeRange) {
        case "WEEK":
            labels = weekDays
            if (selectedGroupsFilter && selectedGroupsFilter.groupType != "expenses") {
                selectedGroupsFilter.selectedGroups.forEach((group, index) => {
                    const selectedGroupExpenses = expensesGlobal.filter(expenses => expenses[selectedGroupsFilter.groupType as keyof Expense] === group)
                    const selectedGroupExpensesGroup = groupExpenses("date", selectedGroupExpenses)

                    expensesData = labels.map(day => {
                        const dayExpenses = selectedGroupExpensesGroup.find(group => new Date(group.name).toLocaleDateString('en-US', {weekday: 'long'}) === day);
                        return dayExpenses ? dayExpenses.totalAmount : 0;
                    })
                    chartDataSets.push(createDataSetForGroup(group, expensesData, getColor(index)))
                    console.log(expensesData)
                })
            } else {
                expensesData = labels.map(day => {
                    const dayExpenses = getGroupInfos("date")!.find(group => new Date(group.name).toLocaleDateString('en-US', {weekday: 'long'}) === day);
                    return dayExpenses ? dayExpenses.totalAmount : 0;
                });
                chartDataSets.push(createDataSetForGroup("$ / day", expensesData, getColor(0)))
            }
            break;

        case "MONTH": {
            const year = new Date(refDate!).getFullYear()
            const month = new Date(refDate!).getMonth()
            const days = new Date(year, month, 0).getDate()
            for (let i = 1; i <= days; i++) {
                labels.push(i.toString())
            }
            if (selectedGroupsFilter && selectedGroupsFilter.groupType != "expenses") {
                selectedGroupsFilter.selectedGroups.forEach((group, index) => {
                    const selectedGroupExpenses = expensesGlobal.filter(expenses => expenses[selectedGroupsFilter.groupType as keyof Expense] === group)
                    const selectedGroupExpensesGroup = groupExpenses("date", selectedGroupExpenses)

                    expensesData = labels.map(day => {
                        const dayExpenses = selectedGroupExpensesGroup.find(group => new Date(group.name).getDate() === parseInt(day));
                        return dayExpenses ? dayExpenses.totalAmount : 0;
                    })
                    chartDataSets.push(createDataSetForGroup(group, expensesData, getColor(index)))

                })
            } else {
                expensesData = labels.map(day => {
                    const dayExpenses = getGroupInfos("date")!.find(group => new Date(group.name).getDate() === parseInt(day));
                    return dayExpenses ? dayExpenses.totalAmount : 0;
                })
                chartDataSets.push(createDataSetForGroup("$ / day", expensesData, getColor(0)))
            }
        }
            break;

        case "YEAR":
            labels = months
            expensesData = labels.map((_month, index) => {
                const monthExpenses = getGroupInfos("date")!.filter(group => new Date(group.name).getMonth() === index);
                return monthExpenses.reduce((acc, e) => acc + e.totalAmount, 0);
            });
            if (selectedGroupsFilter && selectedGroupsFilter.groupType != "expenses") {
                selectedGroupsFilter.selectedGroups.forEach((group, index) => {
                    const selectedGroupExpenses = expensesGlobal.filter(expenses => expenses[selectedGroupsFilter.groupType as keyof Expense] === group)
                    const selectedGroupExpensesGroup = groupExpenses("date", selectedGroupExpenses)

                    expensesData = labels.map((_month, index) => {
                        const monthExpenses = selectedGroupExpensesGroup.find(group => new Date(group.name).getMonth() === index);
                        return monthExpenses ? monthExpenses.totalAmount : 0;
                    })
                    chartDataSets.push(createDataSetForGroup(group, expensesData, getColor(index)))

                })
            } else {
                chartDataSets.push(createDataSetForGroup("$ / month", expensesData, getColor(0)))
            }
            break

        case "ALL": {
            const firstYear = getFirstAndLastYear(expensesGlobal).firstYear
            const lastYear = getFirstAndLastYear(expensesGlobal).lastYear
            for (let i = firstYear; i <= lastYear; i++) {
                labels.push(i.toString())
            }
            expensesData = labels.map(year => {
                const yearExpenses = getGroupInfos("date")!.filter(group => new Date(group.name).getFullYear() === parseInt(year));
                return yearExpenses.reduce((acc, e) => acc + e.totalAmount, 0);
            });
            if (selectedGroupsFilter && selectedGroupsFilter.groupType != "expenses") {
                selectedGroupsFilter.selectedGroups.forEach((group, index) => {
                    const selectedGroupExpenses = expensesGlobal.filter(expenses => expenses[selectedGroupsFilter.groupType as keyof Expense] === group)
                    const selectedGroupExpensesGroup = groupExpenses("date", selectedGroupExpenses)

                    expensesData = labels.map(year => {
                        const yearExpenses = selectedGroupExpensesGroup.find(group => new Date(group.name).getFullYear() === parseInt(year));
                        return yearExpenses ? yearExpenses.totalAmount : 0;
                    })
                    chartDataSets.push(createDataSetForGroup(group, expensesData, getColor(index)))

                })
            } else {
                chartDataSets.push(createDataSetForGroup("$ / year", expensesData, getColor(0)))
            }
            break;
        }
    }

    const data = {
        labels: labels,
        datasets: chartDataSets
    }

    return (
        <>
            <Bar data={data}/>
        </>
    )
}