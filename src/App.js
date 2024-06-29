import React from 'react';
import { Provider } from 'react-redux'
// import FormComponent from './components/FormComponent';
// import ItemForm from './components/ItemForm';
// import ItemsList from './components/ItemsList';
import ProjectComponent from './components/ProjectComponent';
import DataCenterCal from './components/DataCenterCal';
import { Store } from './store/store';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import DataTable from './components/ListData';



function App() {
  // return (
  //     <Provider store={Store}>
  //       {/* <FormComponent /> */}
  //       <ProjectComponent/>
  //       {/* <ItemForm/> */}
  //       {/* <ItemsList/> */}
  //     </Provider>
  // );

  return (
    <Provider store={Store}>
      <Router>
        <NavigationBar />
        <div>
          <Routes>
            <Route path="/project" element={<ProjectComponent/>} />
            <Route path="/datacenter" element={<DataCenterCal/>} />
            <Route path="/" element={<DataTable/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;    
