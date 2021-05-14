import ProductFeature from 'features/Product';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import Header from './features/Header';
import TodoFeature from './features/Todo';


function App() {


  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      }
      const productList = await productApi.getAll(params);
      console.log(productList);
    }
    fetchProducts();
  }, []);



  return (
    <div className="App">

      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact></Redirect>

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/product" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>
    </div >
  );
}

export default App;
