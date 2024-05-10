import {
    Grid,
    Box,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef} from 'react'


const citys = [
    '臺北市',
    '新北市',
    '桃園市',
    '臺中市',
    '臺南市',
    '高雄市',
    '宜蘭縣',
    '新竹縣',
    '苗栗縣',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義縣',
    '屏東縣',
    '花蓮縣',
    '臺東縣',
    '澎湖縣',
    '基隆市',
    '新竹市',
    '嘉義市',
]

export default function SearchBar(){
    const [city, setCity] = useState('');
    const handleChange = (event: { target: { value: string } }) => {
      setCity(event.target.value);
    };
    const [selected, setSelected] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const [hoverSelect, setHoverSelect] = useState(false);
    

    return (
        <Grid container alignItems="center" sx={{mt:4,mb:4}}>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <Box 
                    style={
                        selected? {backgroundColor:'#E6E8EE'}:{}
                    }
                    sx={{
                        display: 'flex',
                        borderRadius: "30px",
                        border: '1px solid #ACB1C6',
                    }}
                >
                    <FormControl size='small' sx={{width:'20%'}} >
                        <InputLabel sx={{
                            paddingLeft: 2,
                            }}
                            shrink = {false}
                            id = 'selectcity'
                        >
                            {city !== '' ? '': <Box><Typography sx={{color:'#000000',fontFamily: 'Noto Sans TC',fontSize: 14}}>城市</Typography><Typography sx={{color:'#ACB1C6',fontFamily: 'Noto Sans TC',fontSize: 14}}>請點選城市</Typography></Box>}
                        </InputLabel>
                        <Select
                            labelId= 'selectcity'
                            value={city}
                            onChange={handleChange}
                            onOpen={()=> setSelected(true)}
                            onClose={()=> setSelected(false)}
                            onMouseEnter={() => setHoverSelect(true)}
                            onMouseLeave={() => setHoverSelect(false)}
                            // displayEmpty
                            inputProps={{ 
                                'aria-label': 'Without label',
                            }}
                            style={
                                selected ? {height:'60px', borderRadius:'30px', border:'1px solid #ACB1C6',backgroundColor: '#FFFFFF', boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, 0.25)'}: hoverSelect? {height:'60px', borderRadius:'30px', border: "1px solid #ACB1C6",backgroundColor: '#E6E8EE'}:{height:'60px'}
                                
                            }
                            MenuProps={{
                                style: {
                                maxHeight: 400,
                                },
                            }}
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': { 
                                    border: '0px',
                                    borderRadius: '30px',
                                    // boxShadow:1
                                },
                                '& .MuiSelect-select': {
                                    paddingLeft: 3,
                                    borderRadius: '30px',
                                    backgroundColor: 'E6E8EE'
                                },
                                "&:hover": {
                                "&& fieldset": {
                                    // border: "1px solid #ACB1C6",
                                    // backgroundColor: '#E6E8EE',
                                    borderRadius: '30px'
                                }
                                },
                                "&:focus": {
                                "&& fieldset": {
                                    border: "1px solid #ACB1C6",
                                    borderRadius: '30px',
                                    boxShadow: 1
                                }
                                }
                            }}
                        >
                            <MenuItem sx={{fontFamily: 'Noto Sans TC',fontSize: 14}} value="">
                                無
                            </MenuItem >
                            {citys.map((city) => (
                                <MenuItem
                                    key={city}
                                    value={city}
                                    //style={getStyles(city, personName, theme)}
                                    sx={{fontFamily: 'Noto Sans TC',fontSize: 14}}
                                >
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {selected? <Divider sx={{borderColor:'#E6E8EE'}} orientation="vertical" variant="middle" flexItem />:hoverSelect? <Divider sx={{borderColor:'#FFFFFF'}} orientation="vertical" variant="middle" flexItem />:<Divider sx={{borderColor:'#ACB1C6'}} orientation="vertical" variant="middle" flexItem />}
                    <FormControl size='small' sx={{width:'80%'}}>
                        <TextField 
                        id="outlined-search" 
                        placeholder="搜尋景點" 
                        type="search" 
                        required={false}
                        sx={{
                            '& .MuiInputBase-root': {
                            fontFamily: 'Noto Sans TC',
                            '.MuiOutlinedInput-notchedOutline': { 
                                border: 0 
                            },
                            height: 60,
                            '&:hover fieldset': {
                                border: '0px solid #ACB1C6',
                            },
                            '&.Mui-focused fieldset': {
                                border: '0px',
                            },
                            
                            },
                            
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="search"
                                    // onClick={handleClickShowPassword}  
                                    // onMouseDown={handleMouseDownPassword}
                                    // edge="end"
                                    sx={{
                                        color: "#FFFFFF",
                                        backgroundColor: "#18CE79",
                                        "&:hover, &.Mui-focusVisible": { 
                                        backgroundColor: "#32E48E"
                                        }
                                    }}
                                >
                                    <SearchIcon /> 
                                </IconButton>
                            </InputAdornment>
                            ),
                            inputRef: searchRef
                        }}
                        InputLabelProps={{shrink: false }}
                        />
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={2}/>
        </Grid>


    )
}