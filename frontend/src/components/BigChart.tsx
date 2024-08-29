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
import {getColor} from "../util/getColor.ts";
import {Box} from "@mui/material";

type DataSet = {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
}
type GroupTypeFilter = "vendor" | "category" | "date" | "expenses";

type selectedGroupsFilter = {
    selectedGroups: string[],
    groupType: GroupTypeFilter
} | null

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


    function createDataSetForGroup(label: string, data: number[], colors: string[]) {
        return {
            label: label,
            data: data,
            backgroundColor: colors[0],
            borderColor: colors[1],
            borderWidth: 1,
        };
    }

    function matchLabelWithDate(dateStr: string, label: string, timeRange: string, index: number) {
        switch (timeRange) {
            case "WEEK":
                return new Date(dateStr).toLocaleDateString('en-US', {weekday: 'long'}) === label
            case "MONTH":
                return new Date(dateStr).getDate() === parseInt(label)
            case "YEAR":
                return new Date(dateStr).getMonth() === index
            case "ALL":
                return new Date(dateStr).getFullYear() === parseInt(label)
        }
    }

    function generateExpensesData(labels: string[], selectedGroupsFilter: selectedGroupsFilter) {
        if (selectedGroupsFilter && selectedGroupsFilter.groupType != "expenses") {
            selectedGroupsFilter.selectedGroups.forEach((group, index) => {
                const selectedGroupExpenses = expensesGlobal.filter(expenses => expenses[selectedGroupsFilter.groupType as keyof Expense] === group)
                const selectedGroupExpensesGroup = groupExpenses("date", selectedGroupExpenses)

                expensesData = labels.map((label, index) => {
                    const groupData = selectedGroupExpensesGroup.find(group => {
                        return matchLabelWithDate(group.name, label, timeRange, index);
                    })
                    return groupData ? groupData.totalAmount : 0;
                })
                chartDataSets.push(createDataSetForGroup(group, expensesData, getColor(index)))
            })
        } else {
            expensesData = labels.map((label, index) => {
                if (timeRange === "YEAR" || timeRange === "ALL") {
                    const groupData = groupExpenses("date", expensesGlobal)!
                        .filter(group => matchLabelWithDate(group.name, label, timeRange, index));
                    return groupData.reduce((acc, group) => acc + group.totalAmount, 0);
                } else {
                    const groupData = groupExpenses("date", expensesGlobal)!.find(group => matchLabelWithDate(group.name, label, timeRange, index));
                    return groupData ? groupData.totalAmount : 0;
                }
            });
            chartDataSets.push(createDataSetForGroup("€", expensesData, getColor(0)))
        }
    }


    switch (timeRange) {
        case "WEEK":
            labels = weekDays
            generateExpensesData(labels, selectedGroupsFilter)
            break;

        case "MONTH":
            const year = new Date(refDate!).getFullYear()
            const month = new Date(refDate!).getMonth() + 1
            const days = new Date(year, month, 0).getDate()

            for (let i = 1; i <= days; i++) {
                labels.push(i.toString())
            }

            generateExpensesData(labels, selectedGroupsFilter)
            break;

        case "YEAR":
            labels = months

            generateExpensesData(labels, selectedGroupsFilter)
            break;


        case "ALL": {
            const firstYear = getFirstAndLastYear(expensesGlobal).firstYear
            const lastYear = getFirstAndLastYear(expensesGlobal).lastYear
            for (let i = firstYear; i <= lastYear; i++) {
                labels.push(i.toString())
            }
            generateExpensesData(labels, selectedGroupsFilter)
            break;
        }
    }

    const data = {
        labels: labels,
        datasets: chartDataSets
    }


    return (
        <Box
               sx={{
                   width: "60%",
                   minWidth: "600px",
               }}>
            <Bar data={data}  />
        </Box>
    )
}