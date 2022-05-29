import React, {useState, useEffect} from 'react';
import { 
    Grid, 
    Typography, 
    OutlinedInput, 
    InputAdornment, 
    Button,
    MenuItem,
    FormControl,
    Select,
    TextField,
} from '@mui/material';
import Style from './styles.module.scss';
import AddIcon from '@mui/icons-material/Add';

const Products = (props) => {
    const { setTotalProduct, totalProduct } = props;
    const {form} = Style;
    const [product, setProduct] = useState({
        productName: 1,
        unit: 1,
        qty: 1,
        price: 700000,
        totalPrice: 0,
    });

    useEffect(() => {
        setProduct({
            ...product,
            totalPrice: product.qty * product.price,
        })
    } , [product.qty, product.price])


    return (
        <Grid item xs>
            <Grid item xs={10} className={form}>
                <Grid container spacing={2} style={{ padding: '0px' }}>
                    <Grid item xs={9} style={{ width: '100%' }}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <Typography variant='subtitle2' style={{fontWeight: '500'}}>Product <span style={{ color: 'red' }}>*</span></Typography>
                                <Select
                                value={product.productName}
                                onChange={(v) => {
                                    setProduct({
                                        ...product,
                                        productName: v.target.value,
                                    });
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                <MenuItem value={1}>
                                    <em>Greenfield Full Cream Milk 1L</em>
                                </MenuItem>
                                <MenuItem value={2}>Low Fat Milk 1L</MenuItem>
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs style={{ width: '100%' }}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                                <Typography variant='subtitle2' style={{fontWeight: '500'}}>Unit <span style={{ color: 'red' }}>*</span></Typography>
                                <Select
                                value={product.unit}
                                onChange={(v) => {
                                    setProduct({
                                        ...product,
                                        unit: v.target.value,
                                    });
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                <MenuItem value={1}>
                                    <em>Karton</em>
                                </MenuItem>
                                <MenuItem value={2}>Plastik</MenuItem>
                                </Select>
                            </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ padding: '0px' }}>
                    <Grid item xs={3} style={{ width: '100%' }}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <Typography variant='subtitle2' style={{fontWeight: '500'}}>Quantity <span style={{ color: 'red' }}>*</span></Typography>
                                <TextField fullWidth
                                    value={product.qty}
                                    onChange={(v) => {
                                    setProduct({
                                        ...product,
                                        qty: v.target.value,
                                    });
                                    }}
                                />
                            </FormControl>
                    </Grid>
                    <Grid item xs={3} style={{ width: '100%' }}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <Typography variant='subtitle2' style={{fontWeight: '500'}}>Price <span style={{ color: 'red' }}>*</span></Typography>
                                <TextField fullWidth 
                                    value={product.price}
                                    onChange={(v) => {
                                    setProduct({
                                        ...product,
                                        price: v.target.value,
                                    });
                                    }}
                                />
                            </FormControl>
                    </Grid>
                    <Grid item xs style={{ width: '100%' }}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                                <Typography variant='subtitle2' style={{fontWeight: '500', textAlign: 'right'}}>Total Price <span style={{ color: 'red' }}>*</span></Typography>
                                <OutlinedInput
                                    disabled
                                    id="outlined-adornment-weight"
                                    value=""
                                    endAdornment={<InputAdornment position="end">{product.totalPrice}</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                    'aria-label': 'weight',
                                    }}
                                />
                        </FormControl>
                        <hr />
                        <Grid container style={{justifyContent: 'space-between'}}>
                            <Typography variant='subtitle1' style={{fontWeight: '700', textAlign: 'left'}}>Total Nett Price</Typography>
                            <Typography variant='subtitle1' style={{fontWeight: '700', textAlign: 'right'}}>{product.totalPrice}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" onClick={() => setTotalProduct(totalProduct + 1)} endIcon={<AddIcon />} style={{backgroundColor : "#FFD24C"}}>
                    NEW ITEM
                </Button>
                <Grid container style={{justifyContent: 'flex-end', gap: '220px'}}>
                    <Typography variant='subtitle1' style={{fontWeight: '700', textAlign: 'left'}}>Total</Typography>
                    <Typography variant='subtitle1' style={{fontWeight: '700', textAlign: 'right'}}>{product.totalPrice}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Products;