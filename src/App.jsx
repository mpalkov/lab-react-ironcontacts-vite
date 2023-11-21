import "./App.css";
import dataBase from "./contacts.json";
import { useState } from "react";

const getFirstNContacts = (array, n) => {
  const nContactsList = [];
  for (let i = 0; i < n; i++) {
    nContactsList.push(array[i]);    
  }
  return nContactsList;
};

function App() {
  const contacts = getFirstNContacts(dataBase, 5);
  const [contactList, setContacts] = useState(contacts);

  const addRandomContact = (list) => {
    const remainingContacts = dataBase.filter((element) => {
      for(let i = 0; i < list.length; i++) {
        if (element.id === list[i].id) {
          return false;
        }
      }
      return true;
    });
    // console.log("cleanlist",dataBase.length, remainingContacts.length);
    const randomNumber = Math.round(Math.random() * remainingContacts.length);
    //console.log(randomNumber);
    const newList = [...list];
    newList.push(remainingContacts[randomNumber]);
    setContacts(newList);
  };

  const sortByName = (list) => {
    const newList = [...list];
    newList.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(newList);
  };

  const sortByPopularity = (list) => {
    const newList = [...list];
    newList.sort((a, b) => (b.popularity - a.popularity));
    setContacts(newList);
  };

  console.log("app is mounted");
  return (
    <div className="App">
      <h1>Iron-Contacts</h1>
      <button onClick={()=> addRandomContact(contactList)}>Add Random Contact</button>
      <button onClick={()=> sortByName(contactList)}>Sort by Name</button>
      <button onClick={()=> sortByPopularity(contactList)}>Sort by Popularity</button>
      <table>
        <tbody>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
        {
          contactList.map((element) => {
            const {pictureUrl, name, popularity, id, wonOscar, wonEmmy} = element;
            return (
              <tr key={id}>
                <td><img width="100px" src={pictureUrl} /></td>
                <td>{name}</td>
                <td>{popularity}</td>
                <td>{wonOscar && "🏆"}</td>
                <td>{wonEmmy && "🌟"}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
