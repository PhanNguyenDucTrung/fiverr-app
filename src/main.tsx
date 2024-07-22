import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider, App as AntdApp } from 'antd';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import App from './App';
import store from './redux/store';

export const history: any = createBrowserHistory();

let message: any;
let notification: any;
let modal: any;

const AppProvider: React.FC = () => {
    const staticFunction = AntdApp.useApp();
    message = staticFunction.message;
    modal = staticFunction.modal;
    notification = staticFunction.notification;
    return null;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider>
        <AntdApp>
            <Provider store={store}>
                <Router history={history}>
                    <AppProvider />
                    <App />
                </Router>
            </Provider>
        </AntdApp>
    </ConfigProvider>
);
