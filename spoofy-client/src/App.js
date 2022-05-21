import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";

// Get code from URL after succesfully logging in.
const uniqueCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return uniqueCode ? <Homepage code={uniqueCode} /> : <Login />;
}

export default App;
