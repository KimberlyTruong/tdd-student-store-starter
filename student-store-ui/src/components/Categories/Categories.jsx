import "./Categories.css"

export default function Categories(props){
    return (
        <div>
            <div className="product-categories">
                <h3 className="product-category category-selected" id="all-categories-tag" onClick={() => props.handleFiltering("All Categories")}>All Categories</h3>
                <h3 className="product-category" id="clothing-tag" onClick={() => props.handleFiltering("clothing")}>Clothing</h3>
                <h3 className="product-category" id="food-tag" onClick={() => props.handleFiltering("food")}>Food</h3>
                <h3 className="product-category" id="accessories-tag" onClick={() => props.handleFiltering("accessories")}>Accessories</h3>
                <h3 className="product-category" id="tech-tag" onClick={() => props.handleFiltering("tech")}>Tech</h3>
            </div>
            <hr id="products-begin"></hr>
        </div>
    )
}
