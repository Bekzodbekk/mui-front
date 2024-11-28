import * as React from 'react';
import { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '../../UI/Input/input';
import axios from 'axios';
import { Alert } from '../../UI/Alerts/Success';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalWindowContent({ open, handleClose, price, color, id }) {
    const { enqueueSnackbar } = useSnackbar();
    const [inputValue, setInputValue] = useState(0);

    const getInputValueHandle = (event) => {
        setInputValue(event.target.value);
    };

    const SubmitHandleFunc = () => {
        const data = {
            product_id: id,
            cost_price: price,
            product_color: color,
            selling_price: parseInt(inputValue)
        };

        try {
            console.log('Fetch boshlandi:', data);

            axios.put('https://localhost:9000/products', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(1);
            enqueueSnackbar('Mahsulot muvaffaqiyatli sotildi!', { variant: 'success' });
            handleClose(); // Modal yopish
        } catch (e) {
            console.log(1);

            console.error('Error:', e.message);
            // Xato bo'lsa
            enqueueSnackbar('Mahsulotni sotishda xatolik yuz berdi!', { variant: 'error' });
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} id="transition-modal-title" variant="h6" component="h2">
                        Mahsulotni sotish
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Narxi: {price}
                    </Typography>
                    <Input
                        label={"Narx kiriting"}
                        onChange={getInputValueHandle}
                    />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={SubmitHandleFunc}
                        >
                            Ha
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Yo'q
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default function ModalWindow({ open, handleClose, price, color, id }) {
    return (
        <SnackbarProvider maxSnack={3}>
            <ModalWindowContent
                open={open}
                handleClose={handleClose}
                price={price}
                color={color}
                id={id}
            />
        </SnackbarProvider>
    );
}