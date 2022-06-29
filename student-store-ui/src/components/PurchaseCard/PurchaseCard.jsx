import "./PurchaseCard.css";

const PORT = 3001;

export default function PurchaseCard(props) {
	return (
		<div className="purchase-card" key={props.purchase.id}>
			<div className="purchase-box">
				<h4>Name</h4>
				<p className="purchase-name">{props.purchase.name}</p>
			</div>
			<div className="purchase-box">
				<h4>Email</h4>
				<p className="purchase-email">{props.purchase.email}</p>
			</div>
			<div className="purchase-order">
				<>
					<h4>Order items</h4>
					<div className="order-item">
						<h5 className="order-item-id">Item ID</h5>
						<h5 className="order-item-name">Item name</h5>
						<h5 className="order-item-price">Price ($)</h5>
						<h5 className="order-item-quantity">Quantity</h5>
					</div>
					{props.purchase.order.map((orderItem) => {
						return (
							<div key={orderItem.itemId} className="order-item">
								<p className="order-item-id">{orderItem.itemId}</p>
								<p className="order-item-name">
									{props.allProducts[orderItem.itemId].name}
								</p>
								<p className="order-item-price">
									${props.allProducts[orderItem.itemId].price}
								</p>
								<p className="order-item-quantity">{orderItem.quantity}</p>
							</div>
						);
					})}
				</>
			</div>
			<div className="purchase-box">
				<h4>Total</h4>
				<p className="purchase-total">{props.purchase.total}</p>
			</div>
			<div className="purchase-box">
				<h4>Created at</h4>
				<p className="purchase-time">{props.purchase.createdAt}</p>
			</div>
			<div className="purchase-receipt">
				<>
					<h4>Reciept</h4>
					{props.purchase.receipt.map((line) => (
						<p key={line}>{line}</p>
					))}
				</>
			</div>
		</div>
	);
}
