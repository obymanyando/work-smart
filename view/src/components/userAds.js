
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';
import Ad from './ad';
import AdForm from './adForm';
import AdDetail from './adDetail';

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

class UserAds extends Component {
	constructor(props) {
		super(props);

		this.ad = {
			title: '',
			detail: '',
			adId: '',
			price: 0,
            userId: '',
            userName: '',
            createdAt: '',
            currency: 'EUR',
            email: '',
            phone: '',
            location: '',
        	address: '',
            postalCode:0,
		}
		this.state = {
			ads: null,
			ad: null,
			errors: [],
			adCreateFormOpen: false,
			adEditFormOpen: false,
			adViewOpen: false,
			uiLoading: true,
		};

	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/adapi/ad')
			.then((response) => {
				this.setState({
					ads: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	adEditFormShow = (data) => {
		this.setState({
			ad: data.ad,
			adEditFormOpen: true
		});
	}

	adEditFormHide = (data) => {
		this.setState({
			ad: null,
			adEditFormOpen: false
		});
	}

	adCreateFormShow = () => {
		this.setState({
			ad: null,
			adCreateFormOpen: true
		});
	};
	
	adCreateFormHide = (event) => {
		this.setState({ 
			ad: null,
			adCreateFormOpen: false
		});
	};
	
	adViewShow = (event) => {
		this.setState({
			ad: event.ad,
			adViewOpen: true
		});
	}
	
	adViewHide = (event) => {
		this.setState({ 
			ad: null,
			adViewOpen: false
		});
	}

	renderViews = () => {
		if(this.state.adCreateFormOpen){
			return (
				<AdForm
					ad={this.state.ad}
					formType="create"
					onClose={this.adCreateFormHide}
				/>
			);
		} else if(this.state.adEditFormOpen) {
			return (
				<AdForm
					ad={this.state.ad}
					formType="edit"
					onClose={this.adEditFormHide}
				/>
			);
		} else if(this.state.adViewOpen) {
			return (
				<AdDetail 
					ad={this.state.ad}
					onClose={this.adViewHide}
				/>
			)
		}
		return null;
	}
	render() {

		dayjs.extend(relativeTime);
		const { classes } = this.props;

		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />

					<IconButton
						className={classes.floatingButton}
						color="primary"
						aria-label="Add Ad"
						onClick={this.adCreateFormShow}
					>
						<AddCircleIcon style={{ fontSize: 60 }} />
					</IconButton>
					
					<Grid container spacing={2}>
						{this.state.ads.map((ad) => (
							<Grid item xs={12} sm={4}>
                                <Ad
									ad={ad}
									onEdit={this.adEditFormShow}
									onView={this.adViewShow}
									controls={{
										viewOption: true,
										editOption:true,
										deleteOption:true
									}}
								/>
							</Grid>
						))}
					</Grid>

					{ this.renderViews() }
				</main>
			);
		}
	}
}

export default withStyles(styles)(UserAds);
