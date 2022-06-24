import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import Loading from "../Loading/Loading"
import {BrowserRouter} from "react-router-dom"
import axios from 'axios'

export default function App() {
  const [allProducts, setAllProducts] = React.useState([])
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [shoppingCart, setShoppingCart] = React.useState([])
  const [checkoutForm, setCheckoutForm] = React.useState({name:'', email:''})
  const [category, setCategory] = React.useState ("All Categories")
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleFiltering = (newCategory=category) => {
    if (category != newCategory){
      if (newCategory !== "All Categories"){
        const categoryElement = document.getElementById(newCategory.toLowerCase() + "-tag")
        categoryElement.classList.add("category-selected")
      }
      else {
        const categoryElement = document.getElementById("all-categories-tag")
        categoryElement.classList.add("category-selected")
      }

      if (category !== "All Categories"){
        const oldCategoryElement = document.getElementById(category.toLowerCase() + "-tag")
        oldCategoryElement.classList.remove("category-selected")
      }
      else {
        const oldCategoryElement = document.getElementById("all-categories-tag")
        oldCategoryElement.classList.remove("category-selected")
      }
    }

    const searchInput = document.getElementById("search-input")
    setSearchTerm(searchInput.value)
    setCategory(newCategory)

    var filteredProducts = []

    setSearchTerm(searchInput.value)

    if (searchInput.value === '' && newCategory === "All Categories"){
      setProducts(allProducts)
      return
    }

    allProducts.forEach((product) => {
      if (((product.name.toLowerCase().includes(searchInput.value)) || (searchInput.value === '')) && ((product.category === newCategory) || (newCategory === "All Categories"))){
        filteredProducts.push(product)
      }
    })

    setProducts(filteredProducts)
  }


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

  React.useEffect (async () => {
    const res = await axios.get("https://codepath-store-api.herokuapp.com/store")
    setProducts(res.data.products);
    setAllProducts(res.data.products)
    setIsFetching(false)
  }, [])

  if (isFetching){
    return (
      <Loading/>
    )
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
                <Sidebar allProducts={allProducts} handleOnToggle={handleOnToggle} shoppingCart={shoppingCart} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}/>
              </div>
              <div className="right-main">
                <Navbar />
                <div className="centered-main">
                      <Home searchTerm={searchTerm} handleFiltering={handleFiltering} shoppingCart={shoppingCart} products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>
                </div>
              </div>
            </main>

        </BrowserRouter>

      </div>
  )
}

 // make a footer!!!
