import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormInputs from "./FormInputs.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {ExpenseDto} from "../model/ExpenseDto.ts";
import {Expense} from "../model/Expense.ts";
import {Box} from "@mui/material";

type FormDialogProps = {
    type: "add" | "edit",
    expense?: Expense
}
type FormData = Expense | ExpenseDto;

type PaymentFrequency = "ONCE" | "WEEKLY" | "MONTHLY" | "YEARLY"

export default function FormDialog({type, expense}: FormDialogProps) {
    const [open, setOpen] = useState(false);
    const [formJson, setFormJson] = useState<FormData | null>(null);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function postExpense() {
            if (formJson) {
                try {
                    if ("id" in formJson) {
                        const response = await axios.put(`api/expenses/${formJson.id}`, formJson)
                        console.log("Expense updated with success!!!", response.data)
                    } else {
                        const response = await axios.post("api/expenses", formJson)
                        console.log("Expense added with success!!!", response.data)
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        postExpense()


    }, [formJson])


    return (
        <Box>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {type === "add" ? "Add New Expense" : "Edit"}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJsonDto: FormData = Object.fromEntries((formData as any).entries());

                        formJsonDto.isCashPayment = formJsonDto.isCashPayment === "on";
                        formJsonDto.amount = parseFloat(parseFloat(formJsonDto.amount).toFixed(2));
                        formJsonDto.paymentFrequency = formData.get('paymentFrequency') as PaymentFrequency;

                        if (type === "add") {
                            setFormJson(formJsonDto)
                        } else {
                            const formJsonExpense: Expense = {...formJsonDto, id: expense!.id}
                            setFormJson(formJsonExpense)
                        }
                        handleClose();
                    },
                }}
            >

                <DialogTitle>{type === "add" ? "Add New Expense" : "Edit Expense"}</DialogTitle>
                <DialogContent>
                    <FormInputs expense={expense}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{type === "add" ? "Add" : "Edit"}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}