import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDom from 'react-dom';
import App from "./app";
import './style.scss';

import {Provider} from 'mobx-react';
import stores from '~s';

ReactDom.render(<Provider stores={stores}>
        <App/>
    </Provider>, document.querySelector('#app'));

