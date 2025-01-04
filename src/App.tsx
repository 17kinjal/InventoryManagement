import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';
import { Header, InventorySummary, InventoryTable, InventoryEditModal } from '@/components';
import { setInventories } from '@/redux/slices/inventorySlice';
import './App.css';
import { RootState } from '@/redux/store';
import { MODAL_TYPE } from './redux/slices/modalSlice';

function App() {
  const dispatch = useDispatch();
  const inventoryItems = useSelector((state: RootState) => state.inventory.items);
  const modal = useSelector((state: RootState) => state.modal);
  const [loading, setLoading] = useState(true);
  const fetchInventory = async () => {
    try {
      const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
      const data = await response.json();

      if (data && data.length > 0) {
        const inventoryWithIds = data.map((item: any) => ({
          ...item,
          id: uuidv4(),
          isActive: true
        }));

        // Dispatch the updated inventory with ids to the Redux store
        dispatch(setInventories(inventoryWithIds));
        setLoading(false); // Stop loading once the data is fetched
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined; // Explicitly type intervalId

    if (!inventoryItems?.length) {
      intervalId = setInterval(() => {
        if (loading) {
          fetchInventory();
        } else {
          intervalId && clearInterval(intervalId); // Stop polling once the result is obtained
        }
      }, 3000); // Poll every 3 seconds
    } else {
      setLoading(false);
    }

    return () => {
      intervalId && clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [loading, inventoryItems]);


  return (
    <Container
      sx={{
        minWidth: '1680px',
        width: '100%',
        padding: '0px !important',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="section" sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 400 }}>
            Inventory stats
          </Typography>
          <InventorySummary />
          {loading ?
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
              <CircularProgress color='secondary' />
            </Box>
            :
            <InventoryTable />
          }
        </Box>
      </Box>
      {modal.isModalOpen === MODAL_TYPE.INVENTORY_EDIT && modal.modalOpenedPayload &&
        <InventoryEditModal open={true} inventory={modal.modalOpenedPayload} />}
    </Container>
  );
}

export default App;
