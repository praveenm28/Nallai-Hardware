import './App.css';
import ViewItems from './Components/ViewItems';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddPart from './Components/AddPart';
import UpdatePart from './Components/UpdatePart';


function App() {
  return (
    <div className="App">
    <Router>
      <div className="container">
        <Switch> 
            <Route path='/' exact={true} component={ViewItems}/>
            <Route path = '/addPart' exact = {true} component = {AddPart}/>
            <Route path = '/updatePart/:id' exact = {true} component = {UpdatePart}/>
        </Switch>
      </div>
    </Router>
  </div>

    
  );
}

export default App;
