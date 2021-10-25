import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';
import {
	DeleteOutline,
	EditOutlined,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

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
	card: {
		background: "#fdf2ee57",
		minWidth: 300,
		borderWidth: "medium"
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

const LightTooltip = withStyles((theme) => ({
	tooltip: {
	  backgroundColor: theme.palette.common.white,
	  color: 'rgba(0, 0, 0, 0.87)',
	  boxShadow: theme.shadows[1],
	  fontSize: 14,
	},
}))(Tooltip);

class ad extends Component {

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		console.log(`handleChange: ${event.target.name} ${event.target.value}`)
	};

	componentWillMount = () => {
	};

	deleteAdHandler = (data) => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let adId = this.props.ad.adId;
		axios
			.delete(`/adapi/ad/${adId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleEditClickOpen = (data) => {
		this.props.onEdit({
			ad: this.props.ad
		})
	}

	handleViewOpen = (data) => {
		this.props.onView({
			ad: this.props.ad
		})
	}

	render() {
		dayjs.extend(relativeTime);
		const { classes } = this.props;
        return(
            <Card className={classes.card} variant="outlined" >
                <CardContent onClick={() => this.handleViewOpen({ ad })}>
                    <Grid container>
                        <Grid item xs={9} sm={9}>
                            <Typography variant="h5" component="h2">
                                {this.props.ad.title.length > 22?  this.props.ad.title.substring(0,20) + '...': this.props.ad.title}
                            </Typography>
						</Grid>
						<Grid item xs={3} sm={3} align="right">
							<Typography variant="h5" component="h2">
								{this.props.ad.price} {this.props.ad.currency}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12}>
                            <Typography className={classes.pos} color="textSecondary">
								Posted by {this.props.ad.userName} {dayjs(this.props.ad.createdAt).fromNow()}
                            </Typography>
                            <Typography variant="detail2" component="p">
                                {this.props.ad.detail.length > 65? this.props.ad.detail.substring(0, 65) + '...': this.props.ad.detail}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions align = "right">
                    { /* this.props.controls.viewOption && 
						<Button size="small" color="primary" onClick={() => this.handleViewOpen({ ad })}>
                        {' '}
                        View{' '}
                    	</Button>
					*/}
					{ this.props.controls.editOption &&
						<LightTooltip title="Edit">
							<IconButton size="small" color="primary" onClick={() => this.handleEditClickOpen({ ad })}>
								<EditOutlined/>
							</IconButton>
						</LightTooltip>
					}
					{ this.props.controls.deleteOption &&
						<LightTooltip title="Delete">
							<IconButton size="small" color="primary" onClick={() => this.deleteAdHandler({ ad })}>
								<DeleteOutline/>
							</IconButton>
						</LightTooltip>
					}
                </CardActions>
            </Card>
        )
    }
}
export default withStyles(styles)(ad);

