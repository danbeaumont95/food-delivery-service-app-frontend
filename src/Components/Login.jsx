import React, { useState, useEffect } from 'react';
import background from '../Images/homepage-background.jpeg';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  allContent: {
    height: '100vh',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%'
  }
}));



const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.allContent}>
      <Typography>Hello dan</Typography>

    </div>
  );
};

export default Login;