import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid(props) {
    return (
      <div className="product-grid">
        {props.products.map((product) => (
            <ProductCard product={product} showDescription={false} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemToCart={props.handleRemoveItemToCart} key={product.id}/>
        ))}
      </div>
    )
}
