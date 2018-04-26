import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/list.js';
import NotFound from './components/notfound/NotFound';
import Detail from './components/Detail/Detail';
import './index.css';

//define components with JS function
const App = () => {
    return (
        <BrowserRouter>
        <div>
            <Header />

            <Switch>
                <Route exact path="/" component = {List} />
                <Route exact path="/currency/:id" component ={Detail} />
                
                <Route component = {NotFound} />
            </Switch>
            
        </div>
        </BrowserRouter>
    );

}


/*
//instead of above function, we can use a react app to declare this
class App extends React.Component {
    render() {
        return <h1> React Coin </h1>;
    }
}

*/

//want to create something in the root dom node
ReactDOM.render(
    <App />,
    document.getElementById('root')
);




