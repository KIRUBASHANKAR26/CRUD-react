import './App.css';
import Sidebar from './components/sideBar';
import Taskform from "./components/task/task.js"
import Topbar from './components/topbar';

function App() {
  return (
    <div >
      <Sidebar/>
      <Topbar/>
      <Taskform/>
    </div>
  );
}

export default App;
