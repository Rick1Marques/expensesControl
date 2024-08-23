type ExpenseCardProps = {
    vendor: string
    amount: number
    category: string
    date: string
    isCashPayment: boolean
    paymentFrequency: "ONCE" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "BIANNUAL" | "YEARLY"
}

export default function ExpenseCard({vendor, amount, isCashPayment, date, paymentFrequency}: ExpenseCardProps) {

    return (
        <li>
            <article>
                <p>{vendor}</p>
                <p>{amount}</p>
                {isCashPayment && <p>cash</p>}
                <p>{date}</p>
                <p>{paymentFrequency}</p>
            </article>
        </li>
    )

}