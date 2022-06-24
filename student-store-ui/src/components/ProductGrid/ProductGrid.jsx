import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid(props) {

    return (
      <div className="product-grid">
        {props.products.map((product) => {
          var quantity = 0
            props.shoppingCart.forEach((item) => {
              if (item.itemId === product.id){
                quantity = item.quantity
              }
            })

            return (
              <ProductCard quantity={quantity} product={product} showDescription={false} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemToCart={props.handleRemoveItemToCart} key={product.id}/>
            )
        })}
      </div>
    )
}
