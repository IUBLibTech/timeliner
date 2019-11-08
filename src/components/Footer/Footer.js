import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import './Footer.scss';

function Footer() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className="footer">
      <Grid item xs={6}>
        <Typography variant="body1">&copy; Indiana University, 2018</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          textAlign: 'right',
        }}
      >
        <Typography variant="body1">
          <Link href="#" onClick={handleClickOpen}>
            About Timeliner
          </Link>
          <Dialog onClose={handleClose} aria-labelledby="about-timeliner" open={open}>
            <MuiDialogTitle id="about-timeliner" onClose={handleClose}>
              About Timeliner
            </MuiDialogTitle>
            <MuiDialogContent dividers>
              <Typography>
                Some text here.
              </Typography>
            </MuiDialogContent>
          </Dialog>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
