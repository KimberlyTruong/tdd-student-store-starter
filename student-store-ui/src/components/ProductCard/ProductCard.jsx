import "./ProductCard.css"
import {Link} from "react-router-dom"

export default function ProductCard(props) {
  var productCardClass = "product-card"

  if (props.showDescription){
    productCardClass += " card-fill-screen"
  }

    return (
      <div className={productCardClass} key={props.product.id}>
        <Link className="media" to={`/products/${props.product.id}`}>
          <img className="product-image" src={props.product.image}/>
        </Link>

        <div className = "product-title-container">
          <p className="product-name">{props.product.name}</p>
          <div className="cart-button-container">
            <button onClick={() => props.handleAddItemToCart(props.product.id)} className="cart-button add">+</button>
            <button onClick={() => props.handleRemoveItemToCart(props.product.id)} className="cart-button remove">-</button>
          </div>
        </div>
        <div className="product-price-quantity-container">
          <p className="product-price">${parseFloat(props.product.price).toFixed(2)}</p>
          {parseInt(props.quantity) > 0 && <p className="product-card-quantity">{props.quantity}</p>}
        </div>
        {props.showDescription && <p className="product-description">{props.product.description}</p>}

      </div>
    )
}
