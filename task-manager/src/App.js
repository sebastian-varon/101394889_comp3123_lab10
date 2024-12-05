import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import "./styles/App.css";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Provider store={store}>
      <div className="bp3-dark app">
        {!token ? <Login setToken={setToken} /> : <TaskList token={token} />}
      </div>
    </Provider>
  );
}

export default App;