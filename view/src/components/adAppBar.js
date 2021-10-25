import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Button, Toolbar, Link} from '@material-ui/core';
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
	button: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
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
	toolbar: theme.mixins.toolbar
});

class AdAppBar extends Component {

	componentWillMount = () => {
	};

	handleLogin = () => {
		this.props.onLogin();
	}

	handleProfile = () => {
		this.props.onProfile();
	}

	renderControls = () => {
		if(this.props.controls) {
			if(this.props.controls.loginOption) {
				return (				
					<Button
						color="inherit"
						onClick={this.handleLogin}
						className={this.props.classes.button}
					>
						Login
					</Button>
				)
			} else if(this.props.controls.profileOption) {
				return (				
					<Button
						color="inherit"
						onClick={this.handleProfile}
						className={this.props.classes.button}
					>
						Profile
					</Button>
				)
			}
			
		}
			
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<Link href="/" color="inherit">
							<Typography variant="h6" noWrap>
								Tinigig
							</Typography>
  						</Link>
						{ this.renderControls() }
					</Toolbar>
				</AppBar>
			</Fragment>
		);
	}
}

export default withStyles(styles)(AdAppBar);
