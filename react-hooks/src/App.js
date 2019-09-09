import React, { Fragment, useState } from "react";
import Todo from "./components/Todo";
import Header from "./components/Header";
import Auth from "./components/Auth";
import AuthContext from "./auth-context";

const App = () => {
  const [page, setPage] = useState("auth");
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = page => setPage(page);

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <AuthContext.Provider value={{ status: authStatus, login }}>
      <Fragment>
        <Header
          onLoadAuth={() => switchPage("auth")}
          onLoadTodos={() => switchPage("todos")}
        />
        <hr />
        {page === "auth" ? <Auth /> : <Todo />}
      </Fragment>
    </AuthContext.Provider>
  );
};

export default App;
