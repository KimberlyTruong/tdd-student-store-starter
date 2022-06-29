import "./purchases.css";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import Search from "../Search/Search";
import { useState, useEffect } from "react";

export default function Purchases(props) {
	const [searchInput, setSearchInput] = useState("");
	const [curPurchases, setCurPurchases] = useState(props.purchases);

	useEffect(async () => {
		setCurPurchases(props.purchases);
	}, [props.purchases]);

	const handleFiltering = () => {
		const searchInput = document.getElementById("search-input");
		setSearchInput(searchInput.value);

		if (searchInput.value === "") {
			return;
		}

		var copyPurchases = [];

		props.purchases.forEach((purchase) => {
			if (purchase.email.includes(searchInput.value)) {
				copyPurchases.push(purchase);
			}
		});
		setCurPurchases(copyPurchases);
	};

	if (curPurchases.length === 0) {
		return (
			<div className="purchases">
				<Search searchTerm={searchInput} handleFiltering={handleFiltering} />
				<p>No purchases found.</p>
			</div>
		);
	}

	return (
		<div className="purchases">
			<Search searchTerm={searchInput} handleFiltering={handleFiltering} />
			{curPurchases.map((purchase) => (
				<PurchaseCard allProducts={props.allProducts} purchase={purchase} />
			))}
		</div>
	);
}
