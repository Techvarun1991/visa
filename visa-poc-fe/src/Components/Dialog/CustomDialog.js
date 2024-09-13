import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import React from 'react';

export default function CustomDialog({
    dialogOpen,         
    dialogTitle,       
    dialogContent,     
    onClose,            
    dialogActions,      
    maxWidth = 'md',    
    fullWidth = true    
}) {
    return (
        <Dialog
            open={dialogOpen}
            onClose={onClose}
            aria-labelledby="custom-dialog-title"
            aria-describedby="custom-dialog-description"
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            <DialogTitle id="custom-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>
                {/* Render custom dialog actions passed in the props */}
                {dialogActions ? dialogActions : <Button onClick={onClose}>Close</Button>}
            </DialogActions>
        </Dialog>
    );
}
