import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineUserDelete } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { getFilteredContacts } from '../../redux/selector';

import { Item, Name, Text, Button } from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();
  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      {contacts.map(({ id, name, number }) => {
        return (
          <Item key={id}>
            <Name>{name} :</Name>
            <Text>{number}</Text>
            <Button type="button" onClick={() => onDeleteContact(id)}>
              <AiOutlineUserDelete />
              Delete
            </Button>
          </Item>
        );
      })}
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};
