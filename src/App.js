// src/App.js
import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

const contactsArray = contacts.slice(0, 5);

function App() {
  const [famous, setFamous] = useState(contactsArray);

  function addFamous() {
    let random = contacts[Math.floor(Math.random() * contacts.length)];

    if (famous.length === contacts.length)
      return "You can't add more contacts!";

    if (famous.some((contact) => contact.id === random.id)) {
      addFamous();
    } else {
      setFamous((famous) => [...famous, random]);
    }
  }

  function orderByName() {
    let sortedByName = famous.slice().sort((a, b) => {
      return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
    });
    setFamous(sortedByName);
  }

  function orderByPopularity() {
    const sortedByPop = famous.slice().sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setFamous(sortedByPop);
  }

  function deleteContact(id) {
    setFamous(famous.filter(contact=>contact.id!==id))
  }

  return (
    <div className="App">
      <button onClick={addFamous}class="btn">Add a random famous to the list</button>
      <button onClick={orderByName}class="btn">Order by Name</button>
      <button onClick={orderByPopularity}class="btn">Order by Popularity</button>

      <table className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Oscar</th>
            <th>Emmy</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {famous.map((famous) => (
            <tr key={famous.id} className="cell">
              <td>
                <img src={famous.pictureUrl} alt="famous avatar" />
              </td>
              <td>{famous.name}</td>
              <td>{famous.popularity}</td>
              <td>{famous.wonOscar ? "🏆" : "❌"}</td>
              <td>{famous.wonEmmy ? "🏆" : "❌"}</td>
              <td><button onClick={() => deleteContact(famous.id)} class="btn-delete">Delete this contact</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
