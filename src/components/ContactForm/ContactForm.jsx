import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOperation';
import { selectContacts } from '../../redux/selector';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiTwotonePhone,
} from 'react-icons/ai';
import { Form, Input, Label, Button } from './ContactForm.styled';

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleChange = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'phone':
        setPhone(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const checkName = name => {
    const newName = name.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === newName);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!checkName(name)) {
      dispatch(addContact({ name, phone }));
      Notify.success('The contact has been sent to storage');
      reset();
    } else {
      Notify.failure('Sorry, Not a unique contact');
      return;
    }
  };

  const reset = () => {
    setName('');
    setPhone('');
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
        Phone :
        <Input
          type="tel"
          value={phone}
          onChange={handleChange}
          name="phone"
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


