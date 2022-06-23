import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import ShoppingCart from "../ShoppingCart/shoppingCart"

// const clickSidebar = (event) => {
//   if (event.currentTarget.parentElement.classList.contains("expanded")){
//     hideSidebar(event.currentTarget)
//   }
//   else {
//     showSidebar(event.currentTarget)
//   }
// }

// const showSidebar = (button) => {
//   button.parentElement.classList.add("expanded")
//   button.children[0].children[0].classList.remove("fa-arrow-right")
//   button.children[0].children[0].classList.add("fa-arrow-left")

//   const hiddenElements = document.getElementsByClassName('open-sidebar-element')
//   for (let i = 0; i < hiddenElements.length; i++){
//     hiddenElements[i].classList.remove('hidden')
//   }
// }

// const hideSidebar = (button) => {
//   button.parentElement.classList.remove("expanded")
//   button.children[0].children[0].classList.remove("fa-arrow-left")
//   button.children[0].children[0].classList.add("fa-arrow-right")

//   const hiddenElements = document.getElementsByClassName('open-sidebar-element')
//   for (let i = 0; i < hiddenElements.length; i++){
//     hiddenElements[i].classList.add('hidden')
//   }
// }

export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <button className="toggle-button" onClick={props.handleOnToggle}>
        <p>
          <i className="fa-solid fa-arrow-right"></i>
        </p>
      </button>
      <div className="open-sidebar-element sidebar-text-box hidden">
        <h2 className="open-sidebar-element hidden">Shopping Cart</h2>
        <ShoppingCart isOpen={props.isOpen} products={props.products} shoppingCart={props.shoppingCart}/>
        <h2 className="open-sidebar-element hidden">Checkout</h2>
        <CheckoutForm isOpen={props.isOpen} shoppingCart={props.shoppingCart} checkoutForm={props.checkoutForm}  handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm}/>
      </div>
    </section>
  )
}
