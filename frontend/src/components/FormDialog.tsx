import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormInputs from "./FormInputs.tsx";
import {useState} from "react";

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [formJson, setFormJson] = useState<Record<string, any> | null>(null);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




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
                        const formJson = Object.fromEntries((formData).entries());
                        setFormJson(formJson)
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