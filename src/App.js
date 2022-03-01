import contacts from "./contacts.json";
import "./App.css";
import { useState } from "react";

const remainingContacts = [...contacts];
const initAgenda = remainingContacts.splice(0, 5);

const App = () => {
  const [agenda, setAgenda] = useState(initAgenda);

  const addContact = () => {
    const rnd = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts.splice(rnd, 1);
    setAgenda(agenda.concat(randomContact));
  };

  const sortPopularity = () => {
    const sortedAgenda = agenda
      .sort((a, b) => b.popularity - a.popularity)
      .slice();

    setAgenda(sortedAgenda);
  };

  const sortName = () => {
    const sortedAgenda = agenda.sort((a, b) =>
      a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    );

    setAgenda([...sortedAgenda]);
  };

  const deleteContact = (contactId) => {
    const filteredAgenda = agenda.filter((contact) => contact.id !== contactId);
    setAgenda(filteredAgenda);
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      <div className='buttons'>
        <button onClick={addContact}>Add Random Contact</button>
        <button onClick={sortPopularity}>Sort by popularity</button>
        <button onClick={sortName}>Sort by name</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agenda.map((contact, i) => {
            return (
              <tr key={i}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt=''
                    className='table-image'
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🏆"}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteContact(contact.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default App;
