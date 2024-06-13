import React, { useState } from 'react';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ProductList />
    </div>
  );
};

export default App;
