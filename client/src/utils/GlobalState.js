import React from "react";

const GlobalContext = React.createContext({
  logged_in: false,
  username: "",
  id: "",
  onUpdate: () => undefined
});

export default GlobalContext;
