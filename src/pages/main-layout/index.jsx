import React, {useState, useRef, useEffect} from 'react'
import { 
    Box, 
    Grid, 
    Typography , 
    Divider, 
    Button,
    MenuItem,
    FormControl,
    Select,
    Badge,
    TextField,
} from '@mui/material';
import Style from './styles.module.scss';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { PickersDay } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { CalendarPickerSkeleton } from '@mui/x-date-pickers';
import fakeFetch from '../../utils/util';
import Products from './products';
// Delete Soon
import MOCK_DATA from '../MOCK_DATA.json'
const {root, form} = Style
const initialValue = new Date();
const MainLayout = () => {
    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState([]);
    const [totalProduct, setTotalProduct] = useState(1);
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    const [ enable, setEnable ] = useState(false);

    const [detail, setDetail] = useState({
        name: null,
        dc: null,
        paymentType: null,
        expiredDate: initialValue,
        notes: '',
    });

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
        .then(({ daysToHighlight }) => {
            setHighlightedDays(daysToHighlight);
            setIsLoading(false);
        })
        .catch((error) => {
            if (error.name !== 'AbortError') {
            throw error;
            }
        });
        requestAbortController.current = controller;
    };

    useEffect(() => {
        fetchHighlightedDays(initialValue);
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };
    
    // const getName = () => {
    //     fetch('http://dummy.restapiexample.com/api/v1/employees')
    //     .then(response => response.json())
    //     .then(data => setName(data));
    // }

    useEffect(() => {
        // getName();
        setName(MOCK_DATA.data);
    });

    const dcVal = [
        {name: 'DC Tanggerang'}, 
        {name: 'DC Cikarang'}
    ];

    // const AllProducts = () => {
    //     for (var i=1; i <= totalProduct; i++){
    //         return <Products setTotalProduct={setTotalProduct} totalProduct={totalProduct} />;
    //     }
    // }
    // useEffect(() => {
    //     AllProducts();
    // }, [totalProduct])

  return (
    <Box sx={{ width:'100%', height: '100%', backgroundColor: '#fff' }}>
       <div className={root}>
        <Grid container >
            <Grid item xs={3}>
                <Typography variant="subtitle2" style={{fontWeight: '700'}}>
                    Detail
                </Typography>
            </Grid>
            <Grid item xs={9} className={form}>
                <Grid item xs={9} style={{ width: '100%' }}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography variant='subtitle2' style={{fontWeight: '500'}}>Name <span style={{ color: 'red' }}>*</span></Typography>
                        <Select
                        value={detail.name ? detail.name : '' }
                        onChange={(v) => {
                            setDetail({
                                ...detail,
                                name: v.target.value,
                            });
                        }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value="">
                            <em>Name</em>
                        </MenuItem>
                        {name.map((item, i) => <MenuItem value={i++}>{item.employee_name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7} style={{ width: '100%' }}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography variant='subtitle2' style={{fontWeight: '500'}}>Distribution Center <span style={{ color: 'red' }}>*</span></Typography>
                        <Select
                            value={detail.dc ? detail.dc : 0 }
                            onChange={(v) => {
                                setDetail({
                                    ...detail,
                                    dc: v.target.value,
                                });
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {
                                (detail.name === null)
                                ? <MenuItem value={1}> <em>No data avaible</em> </MenuItem>
                                : dcVal.map((item, i) => <MenuItem value={i++}>{item.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {(detail.name && detail.dc) &&
                <>
                <Grid container spacing={2} style={{ padding: '0px' }}>
                    <Grid item xs style={{ width: '100%' }}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <Typography variant='subtitle2' style={{fontWeight: '500'}}>Payment Type <span style={{ color: 'red' }}>*</span></Typography>
                                <Select
                                value={detail.paymentType}
                                onChange={(v) => {
                                    setDetail({
                                        ...detail,
                                        paymentType: v.target.value,
                                    });
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                <MenuItem value={1}>
                                    <em>Cash H+1</em>
                                </MenuItem>
                                <MenuItem value={2}>Cash H+2</MenuItem>
                                <MenuItem value={3}>Kredit </MenuItem>
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs style={{ width: '100%' }}>
                        <Typography variant='subtitle2' style={{fontWeight: '500', marginTop: '8px'}}>Expired Date<span style={{ color: 'red' }}>*</span></Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} style={{ width: '100%' }}>
                            <DatePicker
                                value={detail.expiredDate}
                                loading={isLoading}
                                onChange={(v) => {
                                setDetail({
                                    ...detail,
                                    expiredDate: v.target.value,
                                });
                                }}
                                onMonthChange={handleMonthChange}
                                renderInput={(params) => <TextField {...params} />}
                                renderLoading={() => <CalendarPickerSkeleton />}
                                renderDay={(day, _value, DayComponentProps) => {
                                const isSelected =
                                    !DayComponentProps.outsideCurrentMonth &&
                                    highlightedDays.indexOf(day.getDate()) > 0;

                                return (
                                    <Badge
                                    key={day.toString()}
                                    overlap="circular"
                                    badgeContent={isSelected ? '🌚' : undefined}
                                    >
                                    <PickersDay {...DayComponentProps} />
                                    </Badge>
                                );
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid item xs={9} style={{ width: '100%' }}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography variant='subtitle2' style={{fontWeight: '500'}}>Notes</Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue={detail.notes}
                            onChange={(v) => {
                                setDetail({
                                    ...detail,
                                    notes: v.target.value,
                                });
                            }}
                        />
                    </FormControl>
                </Grid>
                </>
                }
            </Grid>
        </Grid>
        {(detail.name && detail.dc && detail.paymentType && detail.expiredDate) && <Divider style={{marginTop : '20px'}} /> }
       </div>
       <div className={root} style={{display: (detail.name && detail.dc && detail.paymentType && detail.expiredDate) ? 'block' : 'none'}}>
        <Grid container >
            <Grid item xs={3}>
                <Typography variant="subtitle2" style={{fontWeight: '700'}}>
                    Products
                </Typography>
            </Grid>
            <Products setTotalProduct={setTotalProduct} totalProduct={totalProduct} setEnable={setEnable} />
        </Grid>
       </div>
       <div className={root}>
        <Divider style={{margin : '20px 0px'}} />
        <Grid container style={{justifyContent: 'flex-end', gap: '20px'}}>
            <Button size="medium" style={{color: '#000', fontWeight: '600'}}>Cancel</Button>
            {enable 
                ? <Button variant="contained" size="medium" color="success"> Confirm</Button>
                : <Button variant="contained" disabled size="medium" color="success"> Confirm</Button>
            }
            
        </Grid>
       </div>
    </Box>
  )
}

export default MainLayout