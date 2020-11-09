/* import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, Icon} from '@material-ui/core'; 
import MenuIcon from '@material-ui/icons/Menu';

const useStyles=makeStyles(()=>({
    root:{
        flexGrow:1
    },
    menuButton:{
        marginRight:'16x'
    },
    title:{
        flexGrow:1
    },
    imagen:{
        borderRadius:'50%'
    }
  
    }));

    function Navbar(props)
{
    const classes=useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="Static">
                <Toolbar>
                    <IconButton edge="Ruleta" className={classes.menuButton} color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Ruleta
                    </Typography>
                    <IconButton color="inherit" >

                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Navbar; */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/NavBar.css';
class NavBar extends Component {
  render() {
    return (
        <div class="container">
      <div className="navbar navbar-default">
        <div className="link-container">
          <Link to="/components/Ruleta" className="link">Ruletas</Link>
        </div>
        <div className="link-container">
          <Link to="/components/Jugador" className="link">Jugadores</Link>
        </div>    
        <div className="link-container">
          <Link to="/components/Partida" className="link">Partida</Link>
        </div>              
      </div>
      </div>
    );
  }
}
export default NavBar;