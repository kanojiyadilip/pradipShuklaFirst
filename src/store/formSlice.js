import { createSlice } from '@reduxjs/toolkit';

  const initialState = {
    clientName: '',
    emailId: '',
    suitNo: '',
    suitStage: '',
    respondent: '',
    advocateName: '',
    dateOfFile: '',
    nextDate: '',
  };

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setClientName: (state, action) => { state.clientName = action.payload; },
    setEmailId: (state, action) => { state.emailId = action.payload; },
    setSuitNo: (state, action) => { state.suitNo = action.payload; },
    setSuitStage: (state, action) => { state.suitStage = action.payload; },
    setRespondent: (state, action) => { state.respondent = action.payload; },
    setAdvocateName: (state, action) => { state.advocateName = action.payload; },
    setDateOfFile: (state, action) => { state.dateOfFile = action.payload; },
    setNextDate: (state, action) => { state.nextDate = action.payload; },
    setAllReduxDataAtTime: (state = initialState, action) => { return{...state, ...action.payload}}
  },
});

export const {
  setClientName,
  setEmailId,
  setSuitNo,
  setSuitStage,
  setRespondent,
  setAdvocateName,
  setDateOfFile,
  setNextDate,
  setAllReduxDataAtTime
} = formSlice.actions;

export default formSlice.reducer;
