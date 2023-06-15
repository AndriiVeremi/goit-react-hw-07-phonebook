import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contactsOperation';
import {
  selectFilteredContacts,
  selectFilter,
  selectIsLoading,
  selectError,
} from '../../redux/selector';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { Item, Name, Text, Button } from './ContactList.styled';

const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectFilter);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const result = useSelector(selectFilteredContacts);

  if (isLoading && !error) {
    return <b>Request in progress...</b>;
  }

  if (error) {
    Notify.failure(error, { position: 'center-top' });
    return <b>Error</b>;
  }

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const getFilteredContacts = data => {
    if (filter.toLowerCase() && !data.length) {
      Notify.warning('No contacts matching your request');
    }
    return data;
  };

  const filteredContacts = getFilteredContacts(result);

  return (
    <>
      {filteredContacts.map(({ id, name, phone }) => {
        return (
          <Item key={id}>
            <Name>{name} :</Name>
            <Text>{phone}</Text>
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
