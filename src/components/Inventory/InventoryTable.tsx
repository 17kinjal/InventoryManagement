import React, { memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { deleteInventory, editInventory, InventoryItem } from '@/redux/slices/inventorySlice';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MODAL_TYPE, openModal } from '@/redux/slices/modalSlice';

const headers = ['Name', 'Category', 'Price', 'Quantity', 'Value', 'Actions'];
const fields = ['name', 'category', 'price', 'quantity', 'value'];

type action = 'edit' | 'delete' | 'active'

const ActionButton = memo(({ onClick, icon: Icon, disabled }: { onClick?: () => void; icon: typeof EditIcon, disabled?: boolean }) => (
	<IconButton
		onClick={onClick}
		color='inherit'
		disabled={disabled}
		sx={{
			'&.Mui-disabled': {
				opacity: 0.5,
				color: 'gray',
			}
		}}>
		<Icon />
	</IconButton>
));

const InventoryTable: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const items = useSelector((state: RootState) => state.inventory.items);
	const role = useSelector((state: RootState) => state.userRole.role);

	const handleActions = (item: InventoryItem, type: action) => {
		switch (type) {
			case 'edit':
				return dispatch(openModal({ type: MODAL_TYPE.INVENTORY_EDIT, payload: item }))
			case 'active':
				dispatch(editInventory({ ...item, isActive: !item.isActive }))
				return;
			case 'delete':
				dispatch(deleteInventory(item.id));
				return;
			default: return
		}
	}

	const actionOptions = useMemo(() => {
		return (item: InventoryItem) => [
			{
				key: 'edit',
				icon: EditIcon,
				disabled: !item.isActive || role === 'user',
			},
			{
				key: 'active',
				icon: item.isActive ? VisibilityIcon : VisibilityOffIcon,
				disabled: role === 'user',
			},
			{
				key: 'delete',
				icon: DeleteIcon,
				disabled: role === 'user',
			},
		];
	}, [role]);

	return (
		<Table sx={{ backgroundColor: 'background.paper' }}>
			<TableHead>
				<TableRow>
					{headers.map((header) => (
						<TableCell key={header} sx={{ color: 'secondary.main' }}>
							<span style={{ backgroundColor: 'black', opacity: '0.4', padding: '6px 8px', borderRadius: '4px' }}>
								{header}
							</span>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{items.length > 0 ? (
					items.map((item) => (
						<TableRow key={item.id}>
							{fields.map((field) => (
								<TableCell key={field} sx={{ opacity: !item.isActive ? '0.5' : 'unset' }}>{item[field as keyof typeof item]}</TableCell>
							))}
							<TableCell>
								{actionOptions(item).map(action => (
									<ActionButton icon={action.icon} key={action.key} onClick={() => handleActions(item, action.key as action)} disabled={action.disabled} />
								))}
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={6} align="center">
							No data available
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default InventoryTable;