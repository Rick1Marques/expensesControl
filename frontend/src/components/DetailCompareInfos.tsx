import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context.tsx";
import {currencyFormatter} from "../util/formatting.ts";

function createData(
    name: string,
    totalAmount: number,
    totalEntries: number,
) {
    const averageTicket = Math.round(totalAmount / totalEntries * 100) / 100
    return {name, totalAmount, totalEntries, averageTicket}
}

export default function DetailCompareInfos() {
    const {expensesVendor, expensesCategory, selectedGroupsFilter} = useContext(ExpensesContext)

    const {selectedGroups, groupType} = selectedGroupsFilter || {};

    const groups = groupType === "vendor" ? expensesVendor : expensesCategory;

    const totalsGroups = groups.reduce((acc, group) => {
        acc.groupsTotalAmount += group.totalAmount
        acc.groupsTotalEntries += group.totalEntries
        return acc
    }, {groupsTotalAmount: 0, groupsTotalEntries: 0})

    const rows = selectedGroups!.map(groupName => {
        const groupData = groups.find(group => group.name === groupName)
        return createData(groupData.name, groupData.totalAmount, groupData.totalEntries)
    })
    rows.push(createData("All", totalsGroups.groupsTotalAmount, totalsGroups.groupsTotalEntries))

    return (
        <TableContainer component={Paper}>
            <Table sx={{width: "100%", height: "100%"}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{groupType![0].toUpperCase() + groupType!.slice(1)}</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Freq.&nbsp;(un.)</TableCell>
                        <TableCell align="right">Avg.&nbsp;(€/un.)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{currencyFormatter.format(row.totalAmount)}</TableCell>
                            <TableCell align="right">{row.totalEntries}</TableCell>
                            <TableCell align="right">{currencyFormatter.format(row.averageTicket)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}