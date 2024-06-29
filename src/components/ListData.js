import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLink, faCogs, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReduxDataAtTime } from '../store/formSlice';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based index) and pad with leading zero
    const year = date.getFullYear(); // Get year
    return `${day}-${month}-${year}`; // Format into dd-mm-yyyy
};

const DataTable = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const formState = useSelector(state => state.formData);
    console.log("--=-=-=-=-=-=->", formState);

    const [data, setData] = useState([
        {
            clientName: 'Dilip',
            emailId: 'dilip1093@gmail.com',
            suitNo: '12345',
            suitStage: 'Ongoing',
            respondent: 'Shraddha',
            advocateName: 'Pradip',
            dateOfFile: '19-06-2024',
            nextDate: '05-07-2024',
            lastUpdated: '19-06-2024'
        }
    ]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
          try {
            // Example using fetch API
            const response = await fetch('http://localhost:3500/list');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log("------ jsonData ------>", jsonData);
            setData(jsonData);
    
            // Example using Axios
            // const response = await axios.get('https://api.example.com/data');
            // setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        return () => {
            fetchData(); // Call the fetchData function
        };
    }, []);

    // let data = [
    //     {
    //         clientName: 'Dilip',
    //         emailId: 'dilip1093@gmail.com',
    //         suitNo: '12345',
    //         suitStage: 'Ongoing',
    //         respondent: 'Shraddha',
    //         advocateName: 'Pradip',
    //         dateOfFile: '19-06-2024',
    //         nextDate: '05-07-2024',
    //         lastUpdated: '19-06-2024'
    //     }
    // ]

    const handleClick = (e, data) => {
        console.log(data)
        dispatch(setAllReduxDataAtTime(data));
        navigate('/datacenter');
    }

    return (
        <Container>
        {/* <h1 className="mt-3">Styled Table Example</h1> */}
        <div style={{marginTop: '40px'}}>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Suit No.</th>
                <th>Email Id</th>
                <th>Client Name</th>
                <th>Suit Stage</th>
                <th>DOF</th>
                <th>Respondent</th>
                <th>Advocate</th>
                <th>Next Date</th>
                <th>Last Update</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    data.map((e,idx)=>(
                        <tr key={idx}>
                            <td></td>
                            <td>{e.suitNo}</td>
                            <td>{e.emailId}</td>
                            <td>{e.clientName}</td>
                            <td>{e.suitStage}</td>
                            <td>{formatDate(e.dateOfFile)}</td>
                            <td>{e.respondent}</td>
                            <td>{e.advocateName}</td>
                            <td>{ formatDate(e.nextDate)}</td>
                            <td>{e.lastUpdated}</td>
                            <td> 
                                <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer'}} onClick={(event) => handleClick(event,e)}/>
                                <FontAwesomeIcon icon={faTrashCan} style={{ cursor: 'pointer',marginLeft: '20px'}}/>  
                                {/* <Link to="/datacenter">About</Link> */}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </div>
        </Container>
    );
};
export default DataTable;
