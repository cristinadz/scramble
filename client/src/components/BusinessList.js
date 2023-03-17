import BusinessCard from "./BusinessCard.js";
import { useRecoilValue } from "recoil";
import { businessesState } from "../recoil/atoms";

function BusinessList() {
	const businesses = useRecoilValue(businessesState);
	const renderedBusinesses = businesses.map((business) => (
		<BusinessCard key={business.id} business={business} />
	));

	return <>{renderedBusinesses}</>;
}

export default BusinessList;
