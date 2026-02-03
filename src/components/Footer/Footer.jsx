import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './Footer.scss';

const Footer = () => (
  <Grid container className="footer">
    <Grid item xs={6}>
      <Typography variant="body1">
        <Link href="https://www.iu.edu/copyright/index.html" underline="default" color="textPrimary">Copyright </Link>
        &copy; 2025 The Trustees of
        <Link href="https://www.iu.edu" underline="default" color="textPrimary"> Indiana University</Link>
      </Typography>
    </Grid>
    <Grid
      item
      xs={6}
      style={{
        textAlign: 'right',
      }}
    >
      <Typography variant="body1">
        <Link href="https://github.com/IUBLibTech/timeliner" underline="default" color="textPrimary">Timeliner at GitHub</Link>
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
