import React from 'react'
import './App.css'
import products from './data/products'
import Table from './components/table/Table'

function App() {
  return <Table products={products} defaultSort='name' />
}

export default App
