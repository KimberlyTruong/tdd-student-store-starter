import "./shoppingCart.css"

export default function ShoppingCart(props) {
    /* Displays the shopping cart in the sidebar and computes the subtotal and total. */
    
    var subtotal = 0
    const tax = 0.0875

    if (props.shoppingCart.length === 0){
        /* Shopping cart is empty. */
        return (
            <div className="notification">No items added to cart yet. Start shopping now!</div>
        )
    }

    return (
        <div className="shopping-cart">
            {props.shoppingCart.map((item) => {
                /* Get the itemId from the shopping cart and then find the matching id in products.
                 * This will give all product information including price. */
                const foundItem = props.products.find((ele) => ele.id === item.itemId)
                subtotal += foundItem.price * item.quantity

                return (
                    <div className="cart-item" key={item.itemId}>
                        <p className="cart-product-name">{foundItem.name}</p>
                        <p className="cart-product-quantity">{item.quantity}</p>
                    </div>)
            })}
            <hr></hr>
            <div className="cart-row">
                <p className="subtotal cart-row-left">Subtotal:</p>
                <p className="cart-row-right">${parseFloat(subtotal).toFixed(2)}</p>
            </div>
            <div className="cart-row">
                <p className="cart-row-left">Taxes and fees:</p>
                <p className="cart-row-right">${parseFloat(subtotal * tax).toFixed(2)}</p>
            </div>
            <div className="cart-row">
                <p className="total-price cart-row-left">Total:</p>
                <p className="cart-row-right">${parseFloat(subtotal * (1 + tax)).toFixed(2)}</p>
            </div>
            <hr></hr>
        </div>
    )
}
