import React, { useState } from 'react';
import VerifyDialog from './VerifyDialog';
import Button from '@material-ui/core/Button';

export const VerifyDialogDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">Delete Item</Button>
      <VerifyDialog
        open={open}
        title="Delete test"
        description="Item will be permanently removed"
        cancelText="Oh, no"
        agreeText="Yes, please"
        onClose={() => setOpen(false)}
        onProceed={() => setOpen(false)}
      />
    </div>
  );
};
