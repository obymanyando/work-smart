import React, { Component } from 'react';
import PublicAds from '../components/publicAds';
import withStyles from '@material-ui/core/styles/withStyles';
import AdAppBar from '../components/adAppBar';
import SearchInput from '../components/searchInput';
import { CssBaseline, Grid } from '@material-ui/core';
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
	search: {
		marginTop: '80px',
		maxWidth: '80%',
		width: '100%'
	}
});

class home extends Component {
	state = {
		render: false
	};

	constructor(props) {
		super(props);

		this.state = {
			uiLoading: true
		};
		this.searchInputRef = React.createRef();
	}

	componentWillMount = () => {
	};

	applyNearMeFilter = () => {

	}
	searchAd = () => {

	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<Grid container>
					<Grid item xs={12}>
						<AdAppBar 
							controls={{
								loginOption: !localStorage.getItem('AuthToken'),
								profileOption: !!localStorage.getItem('AuthToken')
							}}
							onLogin = {() => this.props.history.push('/login')}
							onProfile = {() => this.props.history.push('/profile')}
						/>
					</Grid>
					<Grid item xs={12} align="center">
						<div className={classes.search}>
							<SearchInput
								ref={this.searchInputRef}
								onSubmit={this.searchAd} 
								nearMeFilter={this.applyNearMeFilter}
							/>
						</div>
					</Grid>
					<Grid item xs={12}>
						<PublicAds />
					</Grid>
				</Grid>
			</div>
			
		);
	}
}

export default withStyles(styles)(home);
