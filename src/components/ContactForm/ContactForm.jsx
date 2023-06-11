import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selector';
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiTwotonePhone,
} from 'react-icons/ai';
import { Form, Input, Label, Button } from './ContactForm.styled';

function ContactForm({ contact, onSubmits }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Label>
        <AiOutlineUser />
        Name :{' '}
        <Input
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>

      <Label>
        <AiTwotonePhone />
        Number :
        <Input
          type="tel"
          value={number}
          onChange={handleChange}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit">
        <AiOutlineUserAdd />
        Add contact
      </Button>
    </Form>
  );
}

export default ContactForm;

ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};
