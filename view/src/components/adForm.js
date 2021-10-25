
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Select, MenuItem, FormControl, InputLabel }  from '@material-ui/core';
import { currencyTypes } from '../util/currencyTypes';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';

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
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class adForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			...JSON.parse(JSON.stringify(props.ad)),
			currency: props.ad ? props.ad.currency: "EUR",
			errors: [],
			open: true,
		};

	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(`handleChange: ${event.target.name} ${event.target.value}`)
	};

	componentWillMount = () => {
	};

	handleSubmit = (event) => {
		authMiddleWare(this.props.history);
		event.preventDefault();
		const userAd = {
			title: this.state.title,
			detail: this.state.detail,
			price: this.state.price,
			currency: this.state.currency,
			email: this.state.email,
			address: this.state.address,
			phone: this.state.phone,
			postalCode: this.state.postalCode,
			userName: this.state.userName,
			userId: this.state.userId
		};
		let options = {};
		if (this.props.formType === 'edit') {
			options = {
				url: `/adapi/ad/${this.state.adId}`,
				method: 'put',
				data: userAd
			};
		} else {
			options = {
				url: '/adapi/ad',
				method: 'post',
				data: userAd
			};
		}
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios(options)
			.then(() => {
				this.setState({ open: false });
				window.location.reload();
			})
			.catch((error) => {
				this.setState({ open: true, errors: error.response.data });
				console.log(error);
			});
	};

	handleClose = (event) => {
		this.setState({ open: false });
		this.props.onClose();
	};

	render() {
		dayjs.extend(relativeTime);
		const { classes } = this.props;
		const { errors } = this.state;

		return (
			<Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{this.props.formType === 'edit' ? 'Edit Ad' : 'Create a new Ad'}
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={this.handleSubmit}
							className={classes.submitButton}
						>
							{this.props.formType === 'edit' ? 'Save' : 'Submit'}
						</Button>
					</Toolbar>
				</AppBar>

				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="adTitle"
								label="Title"
								name="title"
								autoComplete="adTitle"
								helperText={errors.title}
								value={this.state.title}
								error={errors.title ? true : false}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id= "adPrice"
								label= "Price"
								name= "price"
								autoComplete= "adPrice"
								helperText= {errors.price}
								value= {this.state.price}
								error= {errors.price ? true : false}
								onChange= {this.handleChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<form>
								<FormControl variant="outlined">
									<InputLabel id="currency-label">Currency</InputLabel>
									<Select
										required
										fullWidth
										labelId="currency-label"
										id= "adCurrency"
										name= "currency"
										onChange= {this.handleChange}
										label= "Currency"
										helperText= {errors.currency}
										value= {this.state.currency}
										error= {errors.currency ? true : false}
									>
										{Object.values(currencyTypes).map( currencyType => 
											<MenuItem value= {currencyType.code}>
												{currencyType.name}, {currencyType.symbol_native}
											</MenuItem>
										)}
									</Select>
								</FormControl>
							</form>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="adDetails"
								label="Details"
								name="detail"
								autoComplete="adDetails"
								multiline
								rows={16}
								rowsMax={16}
								helperText={errors.detail}
								error={errors.detail ? true : false}
								onChange={this.handleChange}
								value={this.state.detail}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="adEmail"
								label="Contact Email"
								name="email"
								autoComplete="adEmail"
								helperText={errors.email}
								error={errors.email ? true : false}
								onChange={this.handleChange}
								value={this.state.email}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant="outlined"
								fullWidth
								id="adPhone"
								label="Contact Phone"
								name="phone"
								autoComplete="adPhone"
								helperText={errors.phone}
								error={errors.phone ? true : false}
								onChange={this.handleChange}
								value={this.state.phone}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								id="adAddress"
								label="Contact Address"
								name="address"
								autoComplete="adAddress"
								helperText={errors.address}
								error={errors.address ? true : false}
								onChange={this.handleChange}
								value={this.state.address}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								id="adPostalCode"
								label="Postal Code"
								name="postalCode"
								autoComplete="adPostalCode"
								helperText={errors.postalCode}
								error={errors.postalCode ? true : false}
								onChange={this.handleChange}
								value={this.state.postalCode}
							/>
						</Grid>
					</Grid>
				</form>
			</Dialog>
		);
	}
}

export default withStyles(styles)(adForm);
