import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Alert, Button} from 'react-bootstrap';
import FormCH from "./form/FormCH";
import styled from 'styled-components';

const background = styled.div`
	
`;

function App() {
	return (
    <div className="App">
        <FormCH/>
    </div>
  );
}

export default App;
