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

  const addRandomContact = () => {
    const remainingContacts = dataBase.filter((element) => {
      for(let i = 0; i < contactList.length; i++) {
        if (element.id === contactList[i].id) {
          return false;
        }
      }
      return true;
    });
    // console.log("cleanlist",dataBase.length, remainingContacts.length);
    const randomNumber = Math.round(Math.random() * remainingContacts.length);
    //console.log(randomNumber);
    const newList = [...contactList];
    newList.push(remainingContacts[randomNumber]);
    setContacts(newList);
  };

  const sortByName = () => {
    const newList = [...contactList];
    newList.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(newList);
  };

  const sortByPopularity = () => {
    const newList = [...contactList];
    newList.sort((a, b) => (b.popularity - a.popularity));
    setContacts(newList);
  };

  const deleteContact = (id) => {
    const newList = contactList.filter((contact) => contact.id !== id);
    setContacts(newList);
  }

  console.log("app is mounted");
  return (
    <div className="App">
      <h1>Iron-Contacts</h1>
      <button onClick={()=> addRandomContact()}>Add Random Contact</button>
      <button onClick={()=> sortByName()}>Sort by Name</button>
      <button onClick={()=> sortByPopularity()}>Sort by Popularity</button>
      <table>
      <thead>        
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
          contactList.map((element) => {
            const {name, pictureUrl, popularity, id, wonOscar, wonEmmy} = element;
            console.log(element, element.pictureUrl, pictureUrl);
            
            return (
              <tr key={id}>
                <td><img width="100px" src={pictureUrl} /></td>
                <td>{name}</td>
                <td>{popularity}</td>
                <td>{wonOscar && "🏆"}</td>
                <td>{wonEmmy && "🌟"}</td>
                <td><button onClick={() => {
                  deleteContact(id);
                }}>Delete</button></td>
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
