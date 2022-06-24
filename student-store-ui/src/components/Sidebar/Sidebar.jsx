import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import ShoppingCart from "../ShoppingCart/shoppingCart"

export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <button className="toggle-button" onClick={props.handleOnToggle}>
        <p>
          <i className="fa-solid fa-arrow-right arrow"></i>
        </p>
      </button>
      <div className="open-sidebar-element sidebar-text-box hidden">
        <h2 className="open-sidebar-element hidden">Shopping Cart</h2>
        <ShoppingCart isOpen={props.isOpen} products={props.allProducts} shoppingCart={props.shoppingCart}/>
        <h2 className="open-sidebar-element hidden">Checkout</h2>
        <CheckoutForm submitError={props.submitError} recieptMessage={props.recieptMessage} isOpen={props.isOpen} shoppingCart={props.shoppingCart} checkoutForm={props.checkoutForm}  handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm}/>
      </div>
    </section>
  )
}
