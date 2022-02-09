import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import * as Types from '../store/types';

import background from '../Images/homepage-background.jpeg';
import { makeStyles } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import RestaurantLogin from './RestaurantLogin';
import UserLogin from './UserLogin';


const useStyles = makeStyles((theme) => ({
	allContent: {
		height: '100vh',
		backgroundImage: `url(${background})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
		['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
			backgroundSize: '150vh'
		},
	},
	signInText: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		fontSize: 25
	},
	buttons: {
	},
	userButton: {
		backgroundColor: 'yellow',
		width: '8%',
		['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
			width: '25%'
		},
		paddingRight: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		marginRight: theme.spacing(2)
	},
	restaurantButton: {
		backgroundColor: 'yellow',
		width: '8%',
		['@media (max-width:1200px)']: { // eslint-disable-line no-useless-computed-key
			width: '25%'
		},
		paddingLeft: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		marginLeft: theme.spacing(2)
	}
}));


const Login = (props) => {
	const classes = useStyles();
	const [buttonClicked, setButtonClicked] = useState('user');

	const onChangeHandler = (name) => {
		setButtonClicked(name);
	};

	return (
		<div className={classes.allContent}>
			<Typography className={classes.signInText}>Sign in!</Typography>
			<div className={classes.buttons}>
				<Button className={classes.userButton} variant='contained' onClick={() => onChangeHandler('user')}>User</Button>
				<Button className={classes.restaurantButton} variant='contained' onClick={() => onChangeHandler('restaurant')}>Restaurant</Button>
			</div>


			{buttonClicked === 'user' ? (
				<UserLogin />
			) : <RestaurantLogin />}
		</div>
	);
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	updateAccessToken: accessToken => dispatch({
		type: Types.UPDATE_ACCESSTOKEN, payload: {
			accessToken
		}
	}),
	updateLoggedInUser: loggedInUser => dispatch({
		type: Types.UPDATE_LOGGED_IN_USER, payload: {
			loggedInUser
		}
	})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Login);