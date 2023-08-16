import "./App.css";
import { ColorModeWrapper } from "./components/color-mode-wrapper";
import ColorToggleButton from "./components/color-toggle-button";
import TodoWrapper from "./components/todo-wrapper";

function App() {
  return (
    <ColorModeWrapper>
      <main>
        <header>
          <ColorToggleButton />
          <h1>{`//TODO`}</h1>
        </header>
        <TodoWrapper />
      </main>
    </ColorModeWrapper>
  );
}

export default App;
