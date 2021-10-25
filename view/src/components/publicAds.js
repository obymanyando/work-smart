
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Ad from './ad';
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
	},
	loadMore: {
		align: "center"
	}
});

class PublicAds extends Component {
	constructor(props) {
		super(props);
		this.lastAd = null;
		this.state = {
			ads: [],
			errors: [],
			uiLoading: true,
		};

	}

	componentWillMount = () => {
		this.loadPublicAdsPage();
	};

	loadPublicAdsPage = () => {
		console.log(this.lastAd);
		axios.get(`/adapi/publicad?lastAdId=${this.lastAd ? this.lastAd.id : ''}`)
		.then((response) => {
			if(response.data && response.data.length > 0) {
				this.setState({
					ads: [
						...this.state.ads,
						...response.data
					],
					uiLoading: false
				});

				this.lastAd = this.state.ads[this.state.ads.length - 1];
				
			}
			
		})
		.catch((err) => {
			console.log(err);
		});
	}

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
		if(this.state.adViewOpen) {
			return (
				<AdDetail 
					ad={this.state.ad}
					onClose={this.adViewHide}
				/>
			)
		}
		return null;
	}

	loadMoreAds = () => {
		this.loadPublicAdsPage()
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
					<Grid container spacing={2}>
						{this.state.ads.length > 0? 
							this.state.ads.map((ad) => (
								<Grid item xs={12} sm={4}>
									<Ad
										ad={ad}
										onView={this.adViewShow}
										controls={{
											viewOption: true,
											editOption: false,
											deleteOption: false
										}}
									/>
								</Grid>
							))
							:null
						}
						<Grid item xs={12} align="center">
							<Button variant="contained" color="primary" onClick={this.loadMoreAds}>
								Load More Gigs
							</Button>
						</Grid>
					</Grid>

					{ this.renderViews() }
				</main>
			);
		}
	}
}

export default withStyles(styles)(PublicAds);
