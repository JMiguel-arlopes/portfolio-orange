import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      {/* <h1>NavBar</h1> */}
      <Outlet />
      {/* <h1>footer</h1> */}
    </div>
  );
}
