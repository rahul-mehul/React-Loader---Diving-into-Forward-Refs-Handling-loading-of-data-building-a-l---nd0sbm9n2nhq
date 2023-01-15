import React from "react";
import "../styles/App.css";
import Loader from "./Loader";
import axios from 'axios'

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    webiste: "",
  });

  const handleOnClick = () => {
    // fetch(`${BASE_URL}/${userId}`).then(res => res.json()).then(data => console.log(data))
    setIsLoading(LoadingStatus.IN_PROGRESS)
    setTimeout(async () => {
      // console.log("logging the data")
      try {
        let data = await axios.get(`${BASE_URL}/${userId}`)
        let { id, email, name, phone, website } = data.data;
        let tempUserData = { id, email, name, phone, website };
        setUserData(tempUserData);
        setIsLoading(LoadingStatus.SUCCESS);
      } catch (error) {
        setIsLoading(LoadingStatus.Error)
        console.log(error);
      }
    }, 2000);
  };

  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
    <>
      {isLoading === LoadingStatus.IN_PROGRESS ? <Loader /> : (
        <div id="main">
          <label htmlFor="number">Enter an id for the user between 1 to 100</label>
          <input
            type="number"
            value={userId}
            onChange={onChangeHandler}
            id="input"
            min={1}
            max={10}
          />
          <button id="btn" onClick={handleOnClick}>
            Get User
          </button>

          <div id="data">
            <h1>Click on the button to get the user</h1>
            <h4 id="id">{userData.id}</h4>
            <h4 id="email">{userData.email}</h4>
            <h4 id="name">{userData.name}</h4>
            <h4 id="phone">{userData.phone}</h4>
            <h4 id="website">{userData.website}</h4>
          </div>
        </div>)}
    </>
  );
};

export default App;
