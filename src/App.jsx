import "./App.css";
import dataBase from "./contacts.json";
console.log(dataBase);

const getFirstNContacts = (array, n) => {
  const nContactsList = [];
  for (let i = 0; i < n; i++) {
    nContactsList.push(array[i]);    
  }
  return nContactsList;
};

function App() {
  const contactList = getFirstNContacts(dataBase, 5);
  console.log("app is mounted");
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <table>
        <tbody>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
        </tr>
        {
          contactList.map((element) => {
            const {pictureUrl, name, popularity, id} = element;
            return (
              <tr key={id}>
                <td><img width="100px" src={pictureUrl} /></td>
                <td>{name}</td>
                <td>{popularity}</td>
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
