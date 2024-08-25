import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";

type GroupType = "vendor" | "category" | "date" | "expenses";
type GroupDetailCardProps = {
    groupName: string,
    groupType: GroupType
}
export default function GroupDetailCard({groupName, groupType}: GroupDetailCardProps) {
    const {expensesVendor, expensesCategory, selectedGroupsFilter} = useContext(ExpensesContext)

    const groups = groupType === "vendor" ? expensesVendor : expensesCategory;

    const groupData = groups.find(group => group.name === groupName)

    const totalsGroups = groups.reduce((acc, group) => {
        acc.groupsTotalAmount += group.totalAmount
        acc.groupsTotalEntries += group.totalEntries
        return acc
    }, {groupsTotalAmount: 0, groupsTotalEntries: 0})

    if (!groupData && !selectedGroupsFilter) {
        return <p>Loading...</p>
    }

    if (selectedGroupsFilter!.selectedGroups.length > 1) {
        return (
            <article>
                <h3>{groupData!.name}</h3>
                <p>{groupData!.totalAmount}</p>
                <p>{groupData!.totalEntries}</p>
            </article>
        )
    } else {
        return (
            <>
                <article>
                    <p>Name</p>
                    <p>Total Amount</p>
                    <p>Total Entries</p>
                </article>
                <article>
                    <h3>{groupData!.name}</h3>
                    <p>{groupData!.totalAmount}</p>
                    <p>{groupData!.totalEntries}</p>
                </article>
                <article>
                    <h3>Totals</h3>
                    <p>{totalsGroups!.groupsTotalAmount}</p>
                    <p>{totalsGroups!.groupsTotalAmount}</p>
                </article>
            </>
        )
    }

}