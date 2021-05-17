import ProductFeature from 'features/Product';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Header from './features/Header';


function App() {

  return (
    <div className="App">

      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact></Redirect>

        {/* <Route path="/" component={ProductFeature} exact /> */}
        <Route path="/product" component={ProductFeature} exact />

        <Route component={NotFound} />
      </Switch>
    </div >
  );
}

export default App;
