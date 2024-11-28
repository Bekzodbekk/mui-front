import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


const DebtItem = () => {
    return (
        <Card sx={{ width: "100%" }}>
            <CardActionArea>
                <CardContent sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", justifyItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                        <strong>First Name:</strong> Bekzod
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                        <strong>Last Name:</strong> Abdulazizov
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                        <strong>Phone Number:</strong> +998 90 123 4567
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                        <strong>JSHSHIR:</strong> 597824356792
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                        <strong>Price:</strong> 1,500,000 UZS
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                        <strong>Deadline:</strong> 15 December 2024
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default DebtItem