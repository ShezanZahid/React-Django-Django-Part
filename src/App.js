import "./App.css";
import AddPost from "./Add";
import NewModal from "./Modal";
import ListPost from "./List";
import { useState } from "react";
import { MyContext } from "./helperContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Postview from "./view";
import Login from "./Loginpage";
import Register from "./Registerpage";
import Logout from "./logoutpage";
import { ProtectedRoute } from "./auth";
import Layout from "./Layout";

function App() {
  const [postlist1, setPostlist1] = useState(false);
  return (
    <Router>
      <MyContext.Provider value={{ postlist1, setPostlist1 }}>
      <ProtectedRoute path="/" component={Layout}/>
        <Switch>
          <ProtectedRoute exact path="/" component={ListPost}/>
          <ProtectedRoute exact path="/view/:id" component={Postview}/>           
          <ProtectedRoute exact path="/add" component={AddPost}/>          
          <Route exact path="/register" component={Register}/>          
          <Route exact path="/login" component={Login}/>
        </Switch>
      </MyContext.Provider>
    </Router>
  );
}

export default App;
