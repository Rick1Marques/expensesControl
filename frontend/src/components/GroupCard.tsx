
type GroupCardProps = {
    name: string,
    totalAmount: number,
    totalEntries: number
}

export default function GroupCard({name, totalAmount, totalEntries}:GroupCardProps){
    return(
        <li>
            <article>
                <p>{name}</p>
                <p>{totalAmount}</p>
                <p>{totalEntries}</p>
            </article>
        </li>
    )
}