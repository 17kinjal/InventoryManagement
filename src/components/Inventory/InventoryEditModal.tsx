import React from "react";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { openModal } from "@/redux/slices/modalSlice";
import { editInventory, InventoryItem } from '@/redux/slices/inventorySlice';

// Define TypeScript types for the form data
interface InventoryFormData {
	category: string;
	price: number;
	quantity: number;
	value: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
	category: Yup.string().required("Category is required"),
	price: Yup.number()
		.required("Price is required")
		.min(0, "Price must be positive")
		.when("quantity", ([quantity], schema) => {
			if (typeof quantity === "number" && quantity > 0) {
				return schema.min(1, "Price must be greater than 0 when quantity is greater than 0");
			}
			return schema;
		}),
	quantity: Yup.number()
		.required("Quantity is required")
		.min(0, "Quantity must be positive"),
	value: Yup.string().required("Value is required"),
});

interface EditModalProps {
	open: boolean;
	inventory: InventoryItem;
}

const EditInventoryModal: React.FC<EditModalProps> = ({ open, inventory }) => {
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(openModal({ type: '' }))
	}

	const formik = useFormik<InventoryFormData>({
		initialValues: {
			category: inventory.category || "",
			price: parseFloat(String(inventory.price).replace('$', '')) || 0,
			quantity: inventory.quantity || 0,
			value: inventory.value || '$0',
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(editInventory({ ...values, id: inventory.id, name: inventory.name, price: `$${values.price}` }))
			handleClose();
		},
	});

	const { values, handleChange, setFieldValue, isValid, errors, handleSubmit } = formik;
	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Edit Product</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{inventory.name}
				</DialogContentText>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12, sm: 6, md: 6 }}>
							<TextField
								fullWidth
								id="category"
								name="category"
								label="Category"
								value={values.category}
								onChange={handleChange}
								error={Boolean(errors.category)}
								helperText={errors.category}
								margin="normal"
								color="secondary"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 6 }}>
							<TextField
								fullWidth
								id="price"
								name="price"
								label="Price"
								type="number"
								value={values.price}
								onChange={(e) => {
									const priceValue: number = parseFloat(e.target.value) || 0;
									setFieldValue('value', `$${(priceValue) * (values.quantity)}`);
									setFieldValue('price', priceValue);
								}}
								error={Boolean(errors.price)}
								helperText={errors.price}
								margin="normal"
								color="secondary"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 6 }}>
							<TextField
								fullWidth
								id="quantity"
								name="quantity"
								label="Quantity"
								type="number"
								value={values.quantity}
								onChange={(e) => {
									const quantityValue: number = parseFloat(e.target.value) || 0;
									setFieldValue('value', `$${quantityValue * values.price}`);
									setFieldValue('quantity', quantityValue);
								}}
								error={Boolean(errors.quantity)}
								helperText={errors.quantity}
								margin="normal"
								color="secondary"
							/>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 6 }}>
							<TextField
								fullWidth
								id="value"
								name="value"
								label="Value"
								value={`$${values.quantity * values.price}`}
								margin="normal"
								color="secondary"
								disabled
							/>
						</Grid>
					</Grid>
					<Box display="flex" mt={3} justifyContent="flex-end" gap={2}>
						<Button onClick={handleClose} color="secondary">
							Cancel
						</Button>
						<Button type="submit" variant="contained" color="inherit" disabled={!isValid}>
							Save
						</Button>
					</Box>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditInventoryModal;
