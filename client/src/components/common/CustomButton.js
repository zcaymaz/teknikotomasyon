import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({ backgroundColor, onClick, children, size, href, width, height, fontSize, component, to }) {
    return (
        <Button sx={{
            backgroundColor: backgroundColor,
            textTransform: 'none',
            borderRadius: '30px',
            width: width,
            height: height,
            fontSize: fontSize ? fontSize : '15px',
            fontFamily: 'Poppins'
        }}
            variant="contained" onClick={onClick} size={size} href={href} component={component} to={to}
        >
            {children}
        </Button>
    );
}

export default CustomButton;
