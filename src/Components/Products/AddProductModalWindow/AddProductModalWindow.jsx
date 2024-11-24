import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ColorPicker from '../ColorPicker/ColorPicker';
import { Alert, TextField, Button } from '@mui/material';
import ButtonUI from '../../UI/Button/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const EnhancedInput = ({ label, value, onChange, error, helperText }) => {
    return (
        <Box sx={{ width: "100%", margin: "10px 0px" }}>
            <TextField
                fullWidth
                label={label}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                required
            />
        </Box>
    );
};

const AddProductModalWindow = ({ open, onClose }) => {
    const initialFormState = {
        productName: '',
        productNumber: '',
        productID: '',
        productCount: '',
        productPrice: '',
        selectedColors: [],
        files: []
    };

    const [colorsArray, setColorsArray] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            selectedColors: colorsArray
        }));
    }, [colorsArray]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            files: uploadedFiles
        }));
    }, [uploadedFiles]);

    const resetForm = () => {
        setFormData(initialFormState);
        setColorsArray([]);
        setUploadedFiles([]);
        setErrors({});
        setShowError(false);
        
        // ColorPicker komponentini qayta o'rnatish uchun
        if (document.querySelector('input[type="file"]')) {
            document.querySelector('input[type="file"]').value = '';
        }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        console.log('Yuklangan fayllar:', files);
        setUploadedFiles(files);
    };

    const getColorsArray = (colors) => {
        console.log('Kelgan ranglar:', colors);
        setColorsArray(colors);
    };

    const handleInputChange = (field) => (event) => {
        const newValue = event.target.value;
        console.log(`${field} o'zgartirildi:`, newValue);

        setFormData(prev => ({
            ...prev,
            [field]: newValue
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
            setShowError(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        console.log('Validatsiya boshlandi:', formData);

        if (!formData.productName.trim()) {
            newErrors.productName = 'Mahsulot nomi kiritilishi shart';
            isValid = false;
        }

        if (!formData.productCount.trim()) {
            newErrors.productCount = 'Mahsulot soni kiritilishi shart';
            isValid = false;
        }

        if (!formData.productPrice.trim()) {
            newErrors.productPrice = 'Mahsulot narxi kiritilishi shart';
            isValid = false;
        } else if (isNaN(formData.productPrice) || parseFloat(formData.productPrice) <= 0) {
            newErrors.productPrice = 'Mahsulot narxi musbat son bo\'lishi kerak';
            isValid = false;
        }

        if (!formData.selectedColors || formData.selectedColors.length === 0) {
            newErrors.selectedColors = 'Kamida bitta rang tanlanishi kerak';
            isValid = false;
        }

        if (!formData.files || formData.files.length === 0) {
            newErrors.files = 'Kamida bitta fayl yuklash kerak';
            isValid = false;
        }

        setErrors(newErrors);
        console.log('Validatsiya natijalari:', newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        console.log('Forma yuborilmoqda, joriy ma\'lumotlar:', formData);

        if (validateForm()) {
            try {
                const submitFormData = new FormData();
                
                submitFormData.append('productName', formData.productName);
                submitFormData.append('productNumber', formData.productNumber);
                submitFormData.append('productID', formData.productID);
                submitFormData.append('productCount', formData.productCount);
                submitFormData.append('productPrice', formData.productPrice);
                submitFormData.append('selectedColors', JSON.stringify(formData.selectedColors));
                
                formData.files.forEach((file, index) => {
                    submitFormData.append(`file${index}`, file);
                });

                // API ga yuborish (misol uchun)
                // const response = await fetch('your-api-endpoint', {
                //     method: 'POST',
                //     body: submitFormData
                // });
                
                // const result = await response.json();
                // console.log('API natijasi:', result);

                console.log('Forma muvaffaqiyatli validatsiyadan o\'tdi');
                resetForm(); // Forma yuborilgandan so'ng barcha maydonlarni tozalash
                onClose();
            } catch (error) {
                console.error('Xatolik yuz berdi:', error);
                setShowError(true);
            }
        } else {
            setShowError(true);
        }
    };

    // Modal yopilganda formani tozalash
    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                {showError && Object.keys(errors).length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Iltimos, barcha maydonlarni to'ldiring
                    </Alert>
                )}

                <EnhancedInput
                    label="Product name"
                    value={formData.productName}
                    onChange={handleInputChange('productName')}
                    error={!!errors.productName}
                    helperText={errors.productName}
                />

                <EnhancedInput
                    label="Product Uniq Number"
                    value={formData.productNumber}
                    onChange={handleInputChange('productNumber')}
                    error={!!errors.productNumber}
                    helperText={errors.productNumber}
                />

                <EnhancedInput
                    label="Product ID"
                    value={formData.productID}
                    onChange={handleInputChange('productID')}
                    error={!!errors.productID}
                    helperText={errors.productID}
                />

                <EnhancedInput
                    label="Mahsulot soni"
                    value={formData.productCount}
                    onChange={handleInputChange('productCount')}
                    error={!!errors.productCount}
                    helperText={errors.productCount}
                />

                <EnhancedInput
                    label="Mahsulot narxi"
                    value={formData.productPrice}
                    onChange={handleInputChange('productPrice')}
                    error={!!errors.productPrice}
                    helperText={errors.productPrice}
                />

                <ColorPicker 
                    getColorsHandleFunc={getColorsArray}
                />

                <Box sx={{ mt: 2, mb: 2 }}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginRight: 2 }}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileUpload}
                            multiple
                        />
                    </Button>
                    {uploadedFiles.length > 0 && (
                        <span>{uploadedFiles.length} ta fayl yuklandi</span>
                    )}
                    {errors.files && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {errors.files}
                        </Alert>
                    )}
                </Box>

                <Box sx={{ mt: 2 }}>
                    <ButtonUI
                        content="Yangi mahsulot qo'shish"
                        onClick={handleSubmit}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default AddProductModalWindow;