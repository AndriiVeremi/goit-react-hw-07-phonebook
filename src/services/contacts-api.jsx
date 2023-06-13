import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://64859451a795d24810b716bb.mockapi.io/contacts',
});

export const getContacts = () => contactsInstance.get('/');

export const deleteContact = id => {
  return contactsInstance.delete(`/${id}`);
};

export const addContact = data => {
  return contactsInstance.post('/', data);
};

