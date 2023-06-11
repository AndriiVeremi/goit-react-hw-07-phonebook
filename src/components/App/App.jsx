import Header from '../Header/Header';
import Section from '../Section/Section';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { Container, List } from './App.styled';

const App = () => {
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm />
        <Header title="Contacts" />
        <Filter />
        <List>
          <ContactList />
        </List>
      </Section>
    </Container>
  );
};

export default App;
