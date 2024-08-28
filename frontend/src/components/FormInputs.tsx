import TextField from "@mui/material/TextField";
import {FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch} from "@mui/material";
import {useState} from "react";

const paymentFrequencyOpt = ["ONCE", "WEEKLY", "MONTHLY", "YEARLY"]

function toCamelCase(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default function FormInputs() {
    const [paymentFrequency, setPaymentFrequency] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPaymentFrequency(event.target.value as string);
    };

    return (
        <>
            <TextField
                autoFocus
                required
                margin="dense"
                id="category"
                name="category"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                required
                margin="dense"
                id="vendor"
                name="vendor"
                label="Vendor"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                required
                margin="dense"
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                slotProps={{
                    htmlInput: {
                        step: "0.01"
                    }
                }}
            />
            <FormControlLabel
                control={<Switch/>}
                label="Cash Payment"
                name="isCashPayment"
            />
            <TextField
                id="description"
                label="Description"
                name="description"
                multiline
                maxRows={4}
                fullWidth
            />
            <TextField
                label="Date"
                type="date"
                variant="standard"
                fullWidth
                margin="dense"
                name="date"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <FormControl fullWidth>
                <InputLabel id="paymentFrequency">Payment frequency</InputLabel>
                <Select
                    labelId="paymentFrequency"
                    id="paymentFrequency"
                    value={paymentFrequency}
                    label="Payment frequency"
                    onChange={handleChange}
                >
                    {paymentFrequencyOpt.map(opt => <MenuItem key={opt} value={opt}>{toCamelCase(opt)}</MenuItem>)}
                </Select>
            </FormControl>
        </>
    )
}