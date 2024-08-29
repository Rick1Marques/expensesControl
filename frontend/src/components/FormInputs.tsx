import TextField from "@mui/material/TextField";
import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch
} from "@mui/material";
import {useState} from "react";
import {Expense} from "../model/Expense.ts";

const paymentFrequencyOpt = ["ONCE", "WEEKLY", "MONTHLY", "YEARLY"]

function toCamelCase(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

type FormInputsProps = {
    expense?: Expense
}

export default function FormInputs({ expense }: FormInputsProps) {
    const [paymentFrequency, setPaymentFrequency] = useState(expense?.paymentFrequency || '');

    const handleChange = (event: SelectChangeEvent) => {
        setPaymentFrequency(event.target.value as string);
    };

    return (
        <Box>
            <TextField
                sx={{m: "1%"}}
                autoFocus
                required
                margin="dense"
                id="category"
                name="category"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={expense?.category || ''}
            />
            <TextField
                sx={{m: "1%"}}
                required
                margin="dense"
                id="vendor"
                name="vendor"
                label="Vendor"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={expense?.vendor || ''}
            />
            <TextField
                sx={{m: "1%"}}
                required
                margin="dense"
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                defaultValue={expense?.amount || ""}
                slotProps={{
                    htmlInput: {
                        step: "0.01"
                    }
                }}
            />
            <FormControlLabel
                sx={{m: "2% 1%"}}
                control={<Switch defaultChecked={expense?.isCashPayment || false} />}
                label="Cash Payment"
                name="isCashPayment"
            />
            <TextField
                sx={{m: "1%"}}
                id="description"
                label="Description"
                name="description"
                multiline
                maxRows={4}
                fullWidth
                defaultValue={expense?.description || ''}
            />
            <TextField
                sx={{m: "2% 1%"}}
                label="Date"
                type="date"
                variant="standard"
                fullWidth
                margin="dense"
                name="date"
                defaultValue={expense?.date || ''}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <FormControl fullWidth sx={{m: "1%"}}>
                <InputLabel id="paymentFrequency">Payment frequency</InputLabel>
                <Select
                    labelId="paymentFrequency"
                    id="paymentFrequency"
                    name="paymentFrequency"
                    value={paymentFrequency}
                    label="Payment frequency"
                    onChange={handleChange}
                >
                    {paymentFrequencyOpt.map(opt => <MenuItem key={opt} value={opt}>{toCamelCase(opt)}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}
