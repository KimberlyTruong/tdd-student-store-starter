import "./ProductDetail.css"
import ProductView from "../ProductView/ProductView"
import {useParams} from "react-router-dom" //extract product id with this (from the link)
import {useState, useEffect} from "react"
import axios from 'axios'
import NotFound from "../NotFound/NotFound"
import Loading from "../Loading/Loading"

export default function ProductDetail(props) {
    const [product, setProduct] = useState(null) // what do we use the state for?
    const [fetchErr, setFetchErr] = useState(false)

    let {productId} = useParams()

    // Find the quantity of the product from shoppingCart
    var quantity = 0;
    props.shoppingCart.forEach((item) => {
        if (item.itemId === parseInt(productId)){
            quantity = item.quantity
        }
    })

    useEffect (async () => {
        const res = await axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`)
        .catch (function(error) {
            console.log("Hello")
            setFetchErr(true)
        })

        if (!fetchErr) {
            setProduct(res.data.product)
        }

    }, [])

    if (product === null && !fetchErr){
        return (
            <Loading/>
        )
    }

    if (fetchErr){
        return (
            <NotFound/>
        )
    }

    return (
        <div className="product-detail">
            <ProductView product={product} productId={productId} quantity={quantity} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemToCart={props.handleRemoveItemToCart}/>
        </div>
    )
}
