import React, { useState } from 'react';
import ProjectComponent from './ProjectComponent';
import { useNavigate } from 'react-router-dom';


const DataCenterCal = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className='bedcrum'><b onClick={() => {navigate('/');}} style={{cursor: 'pointer'}}>{'<'} Back</b></div>
            <div className="formvid">?
            
                <ProjectComponent />

            </div>
        </>                     
    )
}

export default DataCenterCal;
