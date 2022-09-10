import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
//import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

function App() {
  return (
    <div> 
      <Router>
        <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/" exact element={<ListEmployeeComponent/>}></Route>
              <Route path="/employees" element = {<ListEmployeeComponent/>}></Route>
              <Route path = "/add-employee/:id" element = {<CreateEmployeeComponent/>}></Route>
              <Route path = "/view-employee/:id" element = {<ViewEmployeeComponent/>}></Route>
              {/*<Route path = "/update-employee/:id" element = {<UpdateEmployeeComponent/>}></Route>*/}
            </Routes>                                
          </div>
        <FooterComponent />
      </Router>
    </div>      
  );
}

export default App;
