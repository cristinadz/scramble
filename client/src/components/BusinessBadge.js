import { Badge, Stack } from "@chakra-ui/react";



function BusinessBadge({ categories }) {
	const renderedCategories = categories.slice(0,2).map((category) => (
		<Badge> {category.title}</Badge>
	));
	return (
		<>
			<Stack
				align={"center"}
				justify={"left"}
				direction={"row"}
				mt={6}
				spacing={2}
			>
				{renderedCategories}
			</Stack>
		</>
	);
}

export default BusinessBadge;
