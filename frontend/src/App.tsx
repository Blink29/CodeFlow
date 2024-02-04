import Function from "./components/FunctionComponent/Function";
import NavDropDown from "./components/NavDropDownComponent/NavDropDown";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const title = "Hello World";

  const config = {
    name: "Label",
    type: "dropdown",
    items: [
      { name: "item1", type: "label" },
      { name: "item1", type: "label" },
      { name: "item1", type: "label" },
    ],
  };

  return (
    <div className="App">
      <div className="flex">
        <NavBar title={title} config={config} />
        <div className="basis-4/5">
          <Function />
          <Function />
          <Function />
        </div>
      </div>

      {/* <NavDropDown config={config} /> */}
    </div>
  );
}

export default App;
