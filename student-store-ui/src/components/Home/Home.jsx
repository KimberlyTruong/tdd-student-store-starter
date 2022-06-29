import * as React from "react"
import "./Home.css"
import Hero from "../Hero/Hero"
import Search from "../Search/Search"
import Categories from "../Categories/Categories"
import ProductGrid from "../ProductGrid/ProductGrid"
import ProductDetail from "../ProductDetail/ProductDetail"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import NotFound from "../NotFound/NotFound"
import Purchases from "../Purchases/purchases"

import {Routes, Route} from "react-router-dom"

export default function Home(props) {
  return (
    <div id="home" className="home">
      <Hero />
      <Search searchTerm={props.searchTerm} handleFiltering={props.handleFiltering}/>
      <Categories handleFiltering={props.handleFiltering}/>

      <Routes>

        <Route  path = "/" element = {
          <>
            <ProductGrid shoppingCart={props.shoppingCart} products={props.products} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemToCart={props.handleRemoveItemToCart}/>
            <About/>
            <ContactUs/>
          </>
        }/>

        <Route path="/products/:productId" element={
          <ProductDetail shoppingCart={props.shoppingCart} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemToCart={props.handleRemoveItemToCart}/>
        }/>

        {/* <Route path="/purchases" element={
          <Purchases />
        } /> */}

        <Route path="*" element={<NotFound/>}/>

      </Routes>

    </div>
  )
}
