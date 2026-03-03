import React, { useState } from 'react';
import VerifyDialog from './VerifyDialog';

export const VerifyDialogDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Delete Item</button>
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
