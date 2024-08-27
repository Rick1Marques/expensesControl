import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormInputs from "./FormInputs.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {ExpenseDto} from "../model/ExpenseDto.ts";

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [formJson, setFormJson] = useState<ExpenseDto | null>(null);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function postExpense() {
            if (formJson) {
                console.log(formJson)
                try {
                    const response = await axios.post("api/expenses", formJson)
                    console.log("Success!!!", response.data)
                } catch (err) {
                    console.log(err);
                }
            }
        }

        postExpense()
    }, [formJson])


    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add New Expense
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);

                        const formJson: ExpenseDto = {
                            category: formData.get("category") as string,
                            vendor: formData.get("vendor") as string,
                            amount: parseFloat(formData.get("amount") as string), // Convert string to number
                            isCashPayment: formData.get("isCashPayment") === "true", // Convert string to boolean
                            description: formData.get("description") as string,
                            date: formData.get("date") as string,
                            paymentFrequency: formData.get("paymentFrequency") as "ONCE" | "WEEKLY" | "MONTHLY" | "YEARLY", // Type assertion
                        };

                        setFormJson(formJson)
                        console.log(formJson)
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add new Expense</DialogTitle>
                <DialogContent>
                    <FormInputs/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}