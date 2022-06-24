import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid(props) {
  /* Displays all the products in home. */

  /* If there are no products after filtering, show this. */
    if (props.products.length === 0){
      return (
        <div className="product-grid">
          <p className="no-items-found">No items found...</p>
        </div>
      )
    }

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
