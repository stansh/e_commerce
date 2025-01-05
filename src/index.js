import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { addProductToCart} from './redux/actionCreators'
import {configureStore} from './redux/store';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const mapDispatchToProps =  {
// 	addProductToCard: (item) => addProductToCart(item, "")
  
//   }

const onRedirectCallback = (appState) => {
	sessionStorage.setItem('preAuthCart', JSON.stringify(appState.notAuthCart))
	console.log(sessionStorage.getItem('preAuthCart'))
}


ReactDOM.render(
<React.StrictMode>
	<Auth0Provider
		domain={domain}
		clientId={clientId}
		authorizationParams={{
			redirect_uri: window.location.origin,
			scope: "openid profile email",
		}}
		onRedirectCallback={onRedirectCallback}
	>
	<App />
	</Auth0Provider>
</React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

