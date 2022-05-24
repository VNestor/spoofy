import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { GlobalStyle } from "./globalStyles";

// Get code from URL after succesfully logging in.
const uniqueCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return uniqueCode ? (
    <>
      <GlobalStyle /> <Homepage code={uniqueCode} />
    </>
  ) : (
    <>
      <GlobalStyle /> <Login />
    </>
  );
}

export default App;
