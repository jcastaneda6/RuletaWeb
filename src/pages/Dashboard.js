import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../components/Navbar'; 
import 'fontsource-roboto';
import '../assets/css/Dashboard.css';
import Jugadores from '../components/Jugadores';

const useStyles=makeStyles(()=>({
root:{
    flexGrow:1
}
}));

function Dashboard(props)
{
    const classes=useStyles();
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Navbar/>
                </Grid>
                <Grid item xs={100}>
                    <Jugadores/>
                </Grid>

            </Grid>
        </div>
    );
}
export default Dashboard;