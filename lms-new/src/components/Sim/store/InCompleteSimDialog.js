import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IncompleteSimProDialog from './IncompleteSimProDialog';
import IncompleteSimSiteDialog from './IncompleteSimSiteDialog';
import IncompleteRejectDialog from './IncompleteRejectDialog';
const InCompleteSimDialog = ({ open, setOpen, checked, setRefresh, setChecked }) => {
    const [ proDialog, setProDialog ] = useState(false)
    const [ siteDialog, setSiteDialog ] = useState(false)
    const [ rejectDialog, setRejectDialog ] = useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenPro = () => {
        setProDialog(true);
    }
    const handleOpenSite = () => {
        setSiteDialog(true);
    }
    const handleOpenReject = () => {
        setRejectDialog(true);
    }
    return (
        <>
            <div>
                <Dialog
                    open={ open }
                    onClose={ handleClose }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <div className='flex flex-col space-y-10 py-5'>
                            <Button variant='contained' onClick={ handleOpenPro } color='primary'> Send To Production Floor</Button>
                            <Button variant='contained' onClick={ handleOpenSite } color='primary'> Send To Site Store</Button>
                            <Button variant='contained' onClick={ handleOpenReject } color='primary'> Send To Reject Store</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <IncompleteSimProDialog setChecked={ setChecked } setRefresh={ setRefresh } checked={ checked } proDialog={ proDialog } setProDialog={ setProDialog } />
            <IncompleteSimSiteDialog setChecked={ setChecked } setRefresh={ setRefresh } checked={ checked } siteDialog={ siteDialog } setSiteDialog={ setSiteDialog } />
            <IncompleteRejectDialog setChecked={ setChecked } setRefresh={ setRefresh } checked={ checked } rejectDialog={ rejectDialog } setRejectDialog={ setRejectDialog } />
        </>
    )
}

export default InCompleteSimDialog