import React, { Component } from 'react';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import { authMiddleWare } from '../util/auth';
import Account from '../components/account';
import UserAds from '../components/userAds';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '45%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar,
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	}
});

class profile extends Component {
	state = {
		render: false
	};

	loadAccountPage = (event) => {
		this.setState({ render: true });
	};

	loadAdPage = (event) => {
		this.setState({ render: false });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		this.props.history.push('/');
	};

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			profilePicture: '',
			uiLoading: true,
			imageLoading: false,
			drawerOpen: false
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/adapi/user')
			.then((response) => {
				console.log(response.data);
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					phoneNumber: response.data.userCredentials.phoneNumber,
					country: response.data.userCredentials.country,
					userName: response.data.userCredentials.userName,
					userId: response.data.userCredentials.userId,
					uiLoading: false,
					profilePicture: response.data.userCredentials.imageUrl
				});
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};
	
	toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		  return;
		}
	
		this.setState({ drawerOpen: open });
		event.preventDefault();
	}

	render() {
		const { classes } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={this.toggleDrawer(!this.state.drawerOpen)}
								edge="start"
								className={clsx(classes.menuButton)}
							>
								<MenuIcon />
          					</IconButton>
							<Link href="/" color="inherit">
								<Typography variant="h6" noWrap>
									Tinigigs
								</Typography>
							</Link>
						</Toolbar>
					</AppBar>
					<Drawer
						className={classes.drawer}
						variant="temporary"
						anchor="left"
						open={this.state.drawerOpen}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{ onBackdropClick: this.toggleDrawer(false) }}
					>
						<div className={classes.toolbar} />
						<Divider />
						<center>
							<Avatar src={this.state.profilePicture} className={classes.avatar} />
							<p>
								{' '}
								{this.state.firstName} {this.state.lastName}
							</p>
						</center>
						<Divider />
						<div
							onClick={this.toggleDrawer(false)}
							onKeyDown={this.toggleDrawer(false)}
						>
							<List>
								<ListItem button key="Ad" onClick={this.loadAdPage}>
									<ListItemIcon>
										{' '}
										<NotesIcon />{' '}
									</ListItemIcon>
									<ListItemText primary="MyGigs" />
								</ListItem>

								<ListItem button key="Account" onClick={this.loadAccountPage}>
									<ListItemIcon>
										{' '}
										<AccountBoxIcon />{' '}
									</ListItemIcon>
									<ListItemText primary="Account" />
								</ListItem>

								<ListItem button key="Logout" onClick={this.logoutHandler}>
									<ListItemIcon>
										{' '}
										<ExitToAppIcon />{' '}
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</ListItem>
							</List>
						</div>
					</Drawer>
					{this.state.render ? <Account /> : <UserAds />}
				</div>
			);
		}
	}
}

export default withStyles(styles)(profile);
