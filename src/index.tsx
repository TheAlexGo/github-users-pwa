import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './common.css';
import { App } from './components/App/App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Router basename="/">
            <App />
        </Router>
    </React.StrictMode>,
);
