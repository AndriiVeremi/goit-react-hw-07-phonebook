import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { fetchContacts, addContact, deleteContact } from './contactsOperation';


const status = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
const fetchThunks = [fetchContacts, addContact, deleteContact];
const createStatus = status => isAnyOf(...fetchThunks.map(el => el[status]));


const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};


const handleFulfilledGet = (state, { payload }) => {
  state.items = payload;
};

const handleFulfilledAdd = (state, { payload }) => {
  state.items.push(payload);
};

const handleFulfilledDelete = (state, { payload }) => {
  state.items = state.items.filter(({ id }) => id !== payload);
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = status;
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addMatcher(createStatus(PENDING), handlePending)
      .addMatcher(createStatus(FULFILLED), handleFulfilled)
      .addMatcher(createStatus(REJECTED), handleRejected)
  },
});

export default contactsSlice.reducer;
