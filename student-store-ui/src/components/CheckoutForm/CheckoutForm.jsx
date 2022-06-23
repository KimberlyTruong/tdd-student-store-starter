import "./CheckoutForm.css"

export default function CheckoutForm (props) {
    return (
        <div className="checkout-form">
            <label className="checkout-form-label">
                Name
                <input onChange={() => props.handleOnCheckoutFormChange("name", props.checkoutForm.name)} name="name" type="text" placeholder="Student Name" value={props.checkoutForm.name} className="checkout-form-input"/>
            </label>
            <label className="checkout-form-label">
                Email
                <input onChange={() => props.handleOnCheckoutFormChange("email", props.checkoutForm.email)} name="email" type="email" placeholder="student@codepath.org" value={props.checkoutForm.email} className="checkout-form-input"/>
            </label>
            <button onClick={props.handleOnSubmitCheckoutForm} className="checkout-button">Checkout</button>
        </div>
    )
}
