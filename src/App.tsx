import "./App.css";
import AddFriendForm from "./components/AddFriendForm";
import FriendList from "./components/FriendList";

function App() {
  return (
    <>
      <div>test</div>
      <AddFriendForm />
      <p>-----------</p>
      <FriendList minAge={18} maxAge={96} />
    </>
  );
}

export default App;
