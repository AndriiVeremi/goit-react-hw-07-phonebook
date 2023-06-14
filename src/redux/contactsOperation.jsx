import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/contacts-api';

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

const isDublicate = (contacts, { name, phone }) => {
  const normalizedName = name.toLowerCase().trim();
  const normalizedNumber = phone.trim();

  const dublicate = contacts.some(
    contact =>
      contact.name.toLowerCase().trim() === normalizedName ||
      contact.phone.trim() === normalizedNumber
  );
  return dublicate;
};

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const { data: result } = await api.addContact(data);
      alert(`you have added a contact ${data.name}`);
      return result;
    } catch ({ response }) {
      return rejectWithValue(`Ooops! Wrong... Try again`);
    }
  },

  {
    condition: (data, { getState }) => {
      const {
        contacts: { items },
      } = getState();

      if (isDublicate(items, data)) {
        alert(`This contact is already in contacts`);
        return false; 
      }
    },
  }

);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, { rejectWithValue }) => {
      try {
        await api.deleteContact(id);
        alert(`you definitely want to delete the contact?`);
        return id;
      } catch ({ response }) {
        return rejectWithValue(`Ooops! Wrong... Try again`);
      }
    }
  );
  
