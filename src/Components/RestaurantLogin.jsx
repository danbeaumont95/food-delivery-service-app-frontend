import React, { useState, useEffect } from 'react';
import RestaurantService from '../services/restaurant';
import { connect } from "react-redux";
import * as Types from '../store/types';
import background from '../Images/homepage-background.jpeg';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const theme = createTheme({
	overrides: {
		MuiInputLabel: { // Name of the component ⚛️ / style sheet
			root: { // Name of the rule
				color: "black",
				"&$focused": { // increase the specificity for the pseudo class
					color: "black"
				}
			}
		}
	}
});

const useStyles = makeStyles((theme) => ({
	allContent: {
		height: '100vh',
		backgroundImage: `url(${background})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%',
	},
	loginBox: {
		backgroundColor: 'grey',
		opacity: '90%',
		borderRadius: 10,
		color: 'white'
	},
	restaurantText: {
		fontSize: 20,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	input: {
		color: 'white'
	},
	signInButton: {
		backgroundColor: 'yellow',
	},
	label: {
		color: 'black'
	}
}));

const RestaurantLogin = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [restaurant, setRestaurant] = useState({ email: '', password: '' });
	const [accessToken, setAccessToken] = useState('');
	const [refreshToken, setRefreshToken] = useState('');
	const {
		register, formState: { errors },
	} = useForm();

	const handleChangeRestaurant = (event) => {
		setRestaurant({
			...restaurant,
			[event.target.name]: event.target.value,
		});
	};

	const onSubmitRestaurant = (e) => {
		e.preventDefault();
		RestaurantService.restaurantLogin(restaurant)
			.then(async (res) => {
				if (res.data.success === false && typeof res.data.message === 'string') {
					return Swal.fire({
						title: 'Error!',
						text: res.data.message,
						icon: 'error',
						confirmButtonText: 'Cool'
					});
				}
				if (res.data.success === false && typeof res.data.message === 'object') {
					return Swal.fire({
						title: 'Error!',
						text: res.data.message[0],
						icon: 'error',
						confirmButtonText: 'Cool'
					});
				}
				const {
					data: {
						data: {
							accessToken,
							refreshToken,
							_id
						},
					},
				} = res;
				localStorage.setItem('restaurantToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
				localStorage.setItem('restaurantId', _id);
				localStorage.setItem('userType', 'restaurant');
				setAccessToken(accessToken);
				setRefreshToken(refreshToken);
				props.updateAccessToken(accessToken);
				return Swal.fire({
					title: 'Logged in!',
					text: 'You will now be redirected to the homepage',
				}).then(() => {
					navigate('./home', { replace: true });
				});
			})
			.catch((err) => {
				throw new Error(err);
			});
	};
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography className={classes.restaurantText}>Restaurant</Typography>
				<Box component="form" onSubmit={onSubmitRestaurant} noValidate sx={{ mt: 1 }} className={classes.loginBox}>
					<TextField
						InputLabelProps={{ className: classes.label }}
						{...register('email')}
						onChange={handleChangeRestaurant}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						InputProps={{ className: classes.input }}
					/>
					<TextField
						{...register('password')}
						onChange={handleChangeRestaurant}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						InputProps={{ className: classes.input }}
					/>
					<Button
						className={classes.signInButton}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</ThemeProvider>
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
export default connectComponent(RestaurantLogin);