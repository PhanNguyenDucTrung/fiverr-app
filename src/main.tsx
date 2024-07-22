import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntdApp } from 'antd';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from './App';
import store from './redux/store';

export const history: any = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider>
        <AntdApp>
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </AntdApp>
    </ConfigProvider>
);
