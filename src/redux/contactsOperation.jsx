import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/contacts-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { thunkAPI }) => {
    try {
      const { data } = await api.getContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(`Ooops! Wrong... Try again`);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const { data: result } = await api.addContact(data);
      Notify.success(`you have added new contact ${data.name}`);
      return result;
    } catch ({ response }) {
      return rejectWithValue(`Ooops! Wrong... Try again`);
    }
  },
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, { rejectWithValue }) => {
      try {
        await api.deleteContact(id);
        Notify.success('you delete contact');
        return id;
      } catch ({ response }) {
        return rejectWithValue(`Ooops! Wrong... Try again`);
      }
    }
  );
  
