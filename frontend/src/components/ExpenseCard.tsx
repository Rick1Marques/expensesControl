type ExpenseCardProps = {
vendor: string
amount:number
category: string
date:string
isCashPayment: boolean
}

export default function ExpenseCard({vendor, amount, isCashPayment, date} : ExpenseCardProps){

    return (
        <article>
            <p>{vendor}</p>
            <p>{amount}</p>
            {isCashPayment && <p>cash</p>}
            <p>{date}</p>
        </article>
    )

}