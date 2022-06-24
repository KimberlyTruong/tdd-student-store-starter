import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import "./App.css"
import Loading from "../Loading/Loading"
import Footer from "../Footer/Footer"
import NotFound from "../NotFound/NotFound"
import {BrowserRouter} from "react-router-dom"
import axios from 'axios'

export default function App() {
  /* Use states */
  const [allProducts, setAllProducts] = React.useState([]) // saves all products
  const [products, setProducts] = React.useState([]); // saves currrent products being viewed
  const [isFetching, setIsFetching] = React.useState(true) //  boolean. Determines if the products is still being fetched
  const [error, setError] = React.useState(false) // boolean. API call error
  const [isOpen, setIsOpen] = React.useState(false) // boolean. state of the sidebar toggle button
  const [shoppingCart, setShoppingCart] = React.useState([]) // array of objects (with attributes itemId and quantity)
  const [checkoutForm, setCheckoutForm] = React.useState({name:'', email:''}) // object (with attributes name and email)
  const [category, setCategory] = React.useState ("All Categories")
  const [searchTerm, setSearchTerm] = React.useState('')
  const [recieptMessage, setRecieptMessage] = React.useState('')
  const [submitError, setSubmitError] = React.useState('') // string. the error recieved when pressing the checkout button. There is no error if it's empty.

  const handleFiltering = (newCategory=category) => {
    /* Filter products by category and searchTerm */
    /* There's a new category. Update it */

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

    /* Get the current search term */
    const searchInput = document.getElementById("search-input")
    setSearchTerm(searchInput.value)
    setCategory(newCategory)

    var filteredProducts = []

    setSearchTerm(searchInput.value)

    /* If there are no filters, then just set products to all products */
    if (searchInput.value === '' && newCategory === "All Categories"){
      setProducts(allProducts)
      return
    }

    /* Filter by checking all the products. */
    allProducts.forEach((product) => {
      if (((product.name.toLowerCase().includes(searchInput.value)) || (searchInput.value === '')) && ((product.category === newCategory) || (newCategory === "All Categories"))){
        filteredProducts.push(product)
      }
    })

    setProducts(filteredProducts)
  }


  const handleOnCheckoutFormChange = (name, value) => {
    /* Update the checkout form */
    const inputs = document.getElementsByClassName("checkout-form-input")

    setSubmitError('') // Remove any submit errors.
    setRecieptMessage('')

    if (name === "name"){
      setCheckoutForm({name:inputs[name].value, email:checkoutForm.email})
    }
    else if (name === "email"){
      setCheckoutForm({name:checkoutForm.name, email:inputs[name].value})
    }

  }

  const handleOnSubmitCheckoutForm = () => {
    /* Post the user's purchase to the store. */
    /* Check if there are any errors. */
    if (checkoutForm.name === '' || checkoutForm.email === ''){
      setSubmitError("Error! Please input your name and email.")
      return
    }
    if (shoppingCart.length === 0){
      setSubmitError("Error! Your shopping cart is empty.")
      return
    }

    axios.post('https://codepath-store-api.herokuapp.com/store', {
      user: {
        name: checkoutForm.name,
        email: checkoutForm.email
      },
      shoppingCart: shoppingCart
    })
    .then(function (response) {
      setRecieptMessage("Success! " + response.data.purchase.receipt.lines.join('\n'))
    })
    .catch(function (error) {
      console.log(error);
      setError(true)
      setRecieptMessage("ERROR!")
    });

    setCheckoutForm({name:'', email: ''})
    setShoppingCart([])
  }

  const handleOnToggle = (event) => {
    /* Handle toggling the sidebar button. (Open and close the sidebar) */
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
    setSubmitError(false)

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
    /* Get all products from the store. */
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
      <NotFound/>
    )
  }

  return (
     <div className="app">
        <BrowserRouter basename="/">

            <main>
              <div className = "left-main">
                <Sidebar submitError={submitError} allProducts={allProducts} handleOnToggle={handleOnToggle} shoppingCart={shoppingCart} recieptMessage={recieptMessage} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}/>
              </div>
              <div className="right-main">
                <Navbar />
                <div className="centered-main">
                      <Home searchTerm={searchTerm} handleFiltering={handleFiltering} shoppingCart={shoppingCart} products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemToCart={handleRemoveItemToCart}/>
                </div>
                <Footer handleFiltering={handleFiltering}/>
              </div>
            </main>
        </BrowserRouter>

      </div>
  )
}
