import React from 'react';
import ReactDOM from 'react-dom';
import MyBoard from './MyBoard';
import './index.css';

ReactDOM.render(
			<MyBoard count={5}></MyBoard>,
            document.getElementById('react-container')	
);
