import CartFeatures from 'features/Cart';
import HomeFeatures from 'features/Home';
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
        <Route path="/" component={HomeFeatures} exact />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeatures} />
        <Route component={NotFound} />
      </Switch>
    </div >
  );
}

export default App;
