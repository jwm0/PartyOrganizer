import React from 'react';
import { Link } from 'react-router-dom';

import PartyList from './PartyList';

import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { withTheme, withStyles } from 'material-ui/styles';

//icons
import AccountCircle from 'material-ui-icons/AccountCircle';
import { Paper } from 'material-ui';

const NewUserDashboard = withStyles((theme)=>({
  wrapper: {
    height: '100vh',
    width: '100%',
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.light} 50%)`
  },
  contentLeft: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
    position: 'absolute',
    color: theme.palette.secondary.light,
    left: '2%',
    bottom: '40%'
  },
  contentRight: {
    display: 'flex',
    flexDirection: 'column',    
    width: '45%',
    position: 'absolute',
    right: '2%',
    top: '40%'
  },
  buttonHollow: {
    alignSelf: 'center',
    marginTop: 30,
    border: `4px solid ${theme.palette.secondary.light}`,
    borderRadius: 15,
    width: 200,
    height: 100,
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: 1   
  },
  buttonFill: {
    alignSelf: 'center',   
    marginBottom: 10,    
    borderRadius: 15,    
    width: 200,     
    height: 100,
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: 1           
  },
  '@media (max-width: 500px)': {
    wrapper: {
      background: 'linear-gradient(180deg, pink 50%, cyan 50%)'      
    },
    contentLeft: {
      display: 'flex',
      height: '50%',
      width: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    },
    contentRight: {
      display: 'flex',
      flexDirection: 'column',    
      width: '100%',
      height: '50%',      
      position: 'absolute',
      right: 0,
    },
  }
}))(withTheme()(({ classes, theme })=>{

    return (
      <div className={classes.wrapper}>
        <div className={classes.contentLeft}>
          <div >
            <Typography variant="display3" color="inherit">Create a new party,</Typography>
            <Typography variant="display1" color="inherit">add guests, assign duties and throw the <span style={{color:'#333'}}>best</span> party!</Typography>            
          </div>
          <Button variant="flat" color="secondary" className={classes.buttonHollow} style={{marginRight: 70}}>
            <Typography variant="title" color="inherit">Party up!</Typography>            
          </Button>
        </div>
        <div className={classes.contentRight}>
          <Button variant="raised" color="primary" className={classes.buttonFill} style={{marginLeft: 70}}>
            <Typography variant="title" color="inherit">Let's dance!</Typography>
          </Button>
          <div>
            <Typography variant="display3">Join an <span style={{color: theme.palette.primary.main}}>existing</span> party,</Typography>        
            <Typography variant="display1">tell your mates what you're bringing and have a chat!</Typography>    
          </div>
        </div>
      </div>
    );
}));

const ControlPanel = withStyles((theme)=>({
  paper: {
    width: 300,
    height: 400
  }
}))((props)=>{
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div>Throw a new party</div>
      <div>Join a party</div>      
    </Paper>
  )
})

const styles = theme => ({
  wrapper: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#fff'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  },
});

class Dashboard extends React.Component {
  state={
    anchorEl: null,
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.wrapper}>
         <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <ControlPanel/>
          <PartyList/>
          <Paper>
            Coming up
          </Paper>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(withTheme()(Dashboard));
