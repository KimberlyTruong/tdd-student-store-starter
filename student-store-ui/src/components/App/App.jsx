import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import Search from "../Search/Search"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import axios from 'axios'

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [shoppingCart, setShoppingCart] = React.useState([])
  const [checkoutForm, setCheckoutForm] = React.useState({name:'', email:''})

  const handleOnCheckoutFormChange = (name, value) => {
    const inputs = document.getElementsByClassName("checkout-form-input")

    if (name === "name"){
      setCheckoutForm({name:inputs[name].value, email:checkoutForm.email})
    }
    else if (name === "email"){
      setCheckoutForm({name:checkoutForm.name, email:inputs[name].value})
    }
  }

  const handleOnSubmitCheckoutForm = () => {
    console.log("ss")
    axios.post('https://codepath-store-api.herokuapp.com/store', {
      user: {
        name: checkoutForm.name,
        email: checkoutForm.email
      },
      shoppingCart: shoppingCart
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      setError(true)
    });

    // Clear the inputs
    // make it so we can't submit without required fields and more than one item

    setCheckoutForm({name:'', email: ''})
    setShoppingCart([])
  }

  const handleOnToggle = (event) => {
    const hiddenElements = document.getElementsByClassName('open-sidebar-element')
    let button = event.currentTarget

    if (isOpen){
      setIsOpen(false)
      button.parentElement.classList.remove("expanded")
      button.children[0].children[0].classList.remove("fa-arrow-left")
      button.children[0].children[0].classList.add("fa-arrow-right")

      for (let i = 0; i < hiddenElements.length; i++){
        hiddenElements[i].classList.add('hidden')
      }
    }
    else {
      setIsOpen(true)
      button.parentElement.classList.add("expanded")
      button.children[0].children[0].classList.remove("fa-arrow-right")
      button.children[0].children[0].classList.add("fa-arrow-left")

      for (let i = 0; i < hiddenElements.length; i++){
        hiddenElements[i].classList.remove('hidden')
      }
    }
  }

  const handleAddItemToCart = (itemId) =>
  {
    var copyCart = [...shoppingCart]

    var itemFound = false;
    copyCart.forEach((item) => {
      if (item["itemId"] == itemId){
        item["quantity"]++
        itemFound = true
      }
    })

    if (! itemFound){
      copyCart.push({itemId:itemId, quantity:1})
    }
    setShoppingCart(copyCart)
  }


  const handleRemoveItemToCart = (itemId) =>
  {
    var copyCart = [...shoppingCart]
    var i = 0;

    copyCart.forEach((item) => {
      if (item["itemId"] == itemId && item["quantity"] > 0){
        item["quantity"]--
        if (item["quantity"] == 0){
          copyCart.splice(i, 1)
        }
      }
      i++
    })

    setShoppingCart(copyCart)
  }

  // React.useEffect(() => {
  //   fetch("https://codepath-store-api.herokuapp.com/store")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setProducts(result.products);
  //         setIsFetching(false)
  //       },
  //       (error) => {
  //         setError(error);
  //       }
  //     )
  // }, [])

  React.useEffect (async () => {
    const res = await axios.get("https://codepath-store-api.herokuapp.com/store")
    setProducts(res.data.products);
    setIsFetching(false)
  })

  if (isFetching){ // return loading page

    return null
  }

  if (error){
    return (
      <div></div>
    )
  }

  return (
     <div className="app">
        <BrowserRouter basename="/">

            <main>
              <div className = "left-main">
                <Sidebar handleOnToggle={handleOnToggle} shoppingCart={shoppingCart} products={products} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}/>
              </div>
              <div className="right-main">
                <Navbar />
                <div className="centered-main">
                  <Search />

                  <Routes>

                    <Route  path = "/" element = {
                      <Home products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>
                    }/>

                    <Route path="/products/:productId" element={
                      <ProductDetail shoppingCart={shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>
                    }/>

                    <Route path="*" element={<NotFound/>}/>

               </Routes>

                </div>
              </div>
            </main>



        </BrowserRouter>

      </div>
  )
}

 // make a footer!!!
