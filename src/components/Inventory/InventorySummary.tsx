import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import { Card } from '@/components'

const InventorySummary = () => {
	const { totalProducts, totalValue, outOfStock, categoryCount } = useSelector(
		(state: RootState) => state.inventory
	);
	const inventorySummary = useMemo(() => {
		return [
			{
				key: 'totalProducts',
				title: 'Total product',
				value: totalProducts,
				icon: <ShoppingCartIcon />
			},
			{
				key: 'totalValue',
				title: 'Total product',
				value: totalValue,
				icon: <CurrencyExchangeOutlinedIcon />
			},
			{
				key: 'outOfStock',
				title: 'Out of stocks',
				value: outOfStock,
				icon: <RemoveShoppingCartOutlinedIcon />
			},
			{
				key: 'categoryCount',
				title: 'No of category',
				value: categoryCount,
				icon: <CategoryIcon />
			},
		]
	}, [totalProducts, totalValue, outOfStock, categoryCount])
	return (
		<Grid container spacing={3} justifyContent="center">
			{inventorySummary.map((summary) => (
				<Grid size={{ xs: 12, sm: 6, md: 3 }} key={summary.key}>
					<Card icon={summary.icon} title={summary.title} value={summary.value} />
				</Grid>
			))}
		</Grid>
	)
}

export default InventorySummary