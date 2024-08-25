import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";

type ExpenseCardProps = {
    id:string,
    vendor: string
    amount: number
    category: string
    date: string
    isCashPayment: boolean
    paymentFrequency: "ONCE" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "BIANNUAL" | "YEARLY"
}

export default function ExpenseCard({id, vendor, amount, isCashPayment, date, paymentFrequency}: ExpenseCardProps) {
const{handleChangeSelectedGroupsFilter}=useContext(ExpensesContext)
    return (
        <li>
            <article>
                <button onClick={()=> handleChangeSelectedGroupsFilter(id, "expenses")}>
                    <p>{vendor}</p>
                    <p>{amount}</p>
                    {isCashPayment && <p>cash</p>}
                    <p>{date}</p>
                    <p>{paymentFrequency}</p>
                </button>
            </article>
        </li>
    )

}