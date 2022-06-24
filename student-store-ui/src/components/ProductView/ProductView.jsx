import "./ProductView.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductView(props) {
    /* This is shown in product detail. Just shows the product card in an expanded form. */
    return(
        <div className="product-view">
            <h1 className="product-id">{`Product #${props.productId}`}</h1>
            <ProductCard quantity={props.quantity} product={props.product} showDescription={true} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemToCart={props.handleRemoveItemToCart}/>
        </div>
    )
}
