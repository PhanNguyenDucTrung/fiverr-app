// import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

export const history: any = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
