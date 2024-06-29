import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClientName, setEmailId, setSuitNo, setSuitStage, setRespondent, setAdvocateName, setDateOfFile, setNextDate
} from '../store/formSlice';
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'; // if using Axios
import Swal from 'sweetalert2';

const ProjectComponent = () => {

  const [show, setShow] = useState(false);
  const [sub, setSub] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const formState = useSelector(state => state.formData);
  console.log(formState,'<----------formState--projectComp----------');
  
  const options = ["Water", "DC", "Fuel", "Data Size", "Electricity"];

  const handleChange = (e) => {
    console.log("--index---->", sub);
    console.log("---e.target.value---->",e.target.value);


    console.log("--formState---->",formState);

    const { name, value } = e.target;
    switch (name) {
      case 'clientName':
        dispatch(setClientName(value));
        break;  
      case 'emailId':
        dispatch(setEmailId(value));
        break;  
      case 'suitNo':
        dispatch(setSuitNo(value));
        break;  
      case 'suitStage':
        dispatch(setSuitStage(value));
        break;  
      case 'respondent':
        dispatch(setRespondent(value));
        break;  
      case 'advocateName':
        dispatch(setAdvocateName(value));
        break;  
      case 'dateOfFile':
        dispatch(setDateOfFile(value));
        break;
      case 'nextDate':
        dispatch(setNextDate(value));
        break;                   
      default:
        break;
    }
  }; 

  const submitData = async (e) => {

    setSub(true);
    if(formState.clientName && 
      formState.emailId &&
      formState.suitNo &&
      formState.suitStage &&
      formState.respondent &&
      formState.advocateName &&
      formState.dateOfFile &&
      formState.nextDate ){
        try {
          console.log("-----formState----->", formState);
          const response = await fetch('http://localhost:3500/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Data received:', data);

          if(data.code==200){
            Swal.fire({
              title: 'Data Successfully Saved',
              // text: 'Your form has been submitted successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }  
          // Reset form data after successful submission
          // setFormData({
          //   username: '',
          //   email: '',
          // });

        } catch (error) {
          console.error('Error submitting data:', error);
        }
      }
      else{

      }  
  }

  return (
    <div style={{}}>
      <div style={{width: '90%'}}>
                  <div>
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="clientName" className="form-label">Client Name</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="clientName"
                          name="clientName"
                          value={formState.clientName}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.clientName)?"":<p className='alertp'>Client Name is required</p>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="emailId" className="form-label">Email ID</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="emailId"
                          name="emailId"
                          value={formState.emailId}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.emailId)?"":<p className='alertp'>Email Id is required</p>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="suitNo" className="form-label">Suit No</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="suitNo"
                          name="suitNo"
                          value={formState.suitNo}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.suitNo)?"":<p className='alertp'>Suit No is required</p>}
                    </div>
                  </div>      

                    <div className='row'>
                      <div className="col-md-4">
                        <label htmlFor="suitStage" className="form-label">Suit Stage</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="suitStage"
                          name="suitStage"
                          value={formState.suitStage}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.suitStage)?"":<p className='alertp'>Suit Stage is required</p>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="respondent" className="form-label">Respondent</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="respondent"
                          name="respondent"
                          value={formState.respondent}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.respondent)?"":<p className='alertp'>Respondent is required</p>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="advocateName" className="form-label">Advocate Name</label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          id="advocateName"
                          name="advocateName"
                          value={formState.advocateName}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.advocateName)?"":<p className='alertp'>Advocate Name is required</p>}
                      </div>
                    </div>

                    <div className='row'> 
                      <div className="col-md-4">
                        <label htmlFor="dateOfFile" className="form-label">Date Of File</label>
                        <Form.Control
                          type="date"
                          className="form-control"
                          id="dateOfFile"
                          name="dateOfFile"
                          value={formState.dateOfFile}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.dateOfFile)?"":<p className='alertp'>Date of file is required</p>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="nextDate" className="form-label">Next Date</label>
                        <Form.Control
                          type="date"
                          className="form-control"
                          id="nextDate"
                          name="nextDate"
                          value={formState.nextDate}
                          onChange={(event) => handleChange(event)}
                        />
                        {!(sub && !formState.nextDate)?"":<p className='alertp'>Next Date is required</p>}
                      </div>
                      <div className='col-md-4'>
                        {/* <label htmlFor="nextDate" className="form-label">l</label> */}
                        {/* <button className='btn btn-success'> save </button> */}
                        <div style={{marginTop: '30px'}}>
                        <Button onClick={submitData} variant="success">Save</Button>
                        </div>
                      </div>
                    </div> 

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Project Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <pre>{JSON.stringify(formState, null, 2)}</pre>
                        
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
      </div>
      <div>
        {/* <button className='btn btn-primary' onClick={handleAddClick}>Add</button> */}
      </div>
    </div> 
  );
};

export default ProjectComponent;
