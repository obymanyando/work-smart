
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { Typography, FormLabel }  from '@material-ui/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 300
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '50%'
	},
	viewRoot: {
		margin: 20,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	label: {
		fontWeight: 'bold'
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class adDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...JSON.parse(JSON.stringify(props.ad)),
			errors: [],
			open: true,
		};
	}

	componentWillMount = () => {
	};

	handleClose = (event) => {
		this.setState({ open: false });
		this.props.onClose();
	};

	render() {
		dayjs.extend(relativeTime);
		const { classes } = this.props;
		return (
			<Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Gig Details
						</Typography>
					</Toolbar>
				</AppBar>
				<div className = {classes.viewRoot}>
					<Grid container spacing={2}>
						{ this.state.title &&
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Title </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.title}
								</Grid>
							</Grid>
						}
						{ this.state.price &&
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Price </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.price + ' ' + this.state.currency}
								</Grid>
							</Grid>
						}
						{ this.state.email && 
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Email </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.email}
								</Grid>
							</Grid>
						}
						{ this.state.phone &&
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Phone </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.phone}
								</Grid>
							</Grid>
						}
						{ this.state.address &&
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Address </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.address}
								</Grid>
							</Grid>
						}
						{ this.state.postalCode !==0 &&
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Postal Code </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.postalCode}
								</Grid>
							</Grid>
						}
						{ this.state.detail &&
							<Grid item container>
								<Grid item xs={12}>
									<FormLabel className = {classes.label}>Detail </FormLabel>
								</Grid>
								<Grid item xs={12}>
									{this.state.detail}
								</Grid>
							</Grid>
						}
						
					</Grid>
				</div>
			</Dialog>
		);
	}
}

export default withStyles(styles)(adDetail);
