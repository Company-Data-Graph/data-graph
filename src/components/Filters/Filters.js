import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Dialog from '@mui/material/Dialog';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const Separator = styled('div')(
    ({ theme }) => `
  height: ${theme.spacing(1)};
`,
);

const staffSizeMarks = [
    {
        value: 0,
        label: '2',
    },
    {
        value: 100,
        label: '2M',
    },
];

const yearMarks = [
    {
        value: 0,
        label: '1700',
    },
    {
        value: 100,
        label: '2022',
    },
];

const newData = {
    nodes: [
      { id: "1", svg: "https://icons.iconarchive.com/icons/sicons/basic-round-social/256/yandex-icon.png", status: "Компания", name: "Yandex", ceo: "Аркадий Волож", year: 2000, description: "Яндекс — одна из крупнейших IT-компаний в России. Мы развиваем самую популярную в стране поисковую систему и создаем сервисы, которые помогают людям в повседневных делах."}, 
      { id: "2", svg: "https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/yandex-browser-beta-icon.png", status: "Продукт", name: "Yandex Browser", year: 2012, description: "Яндекс Браузер — это бесплатный веб-браузер, разработанный российской технологической корпорацией Яндекс, который использует движок веб-браузера Blink и основан на проекте с открытым исходным кодом Chromium."}, 
      { id: "3", svg: "https://icons.iconarchive.com/icons/papirus-team/papirus-places/256/folder-blue-yandex-disk-icon.png", status: "Продукт", name: "Yandex Disk", year: 2013, description: "Яндекс.Диск — облачный сервис, принадлежащий компании Яндекс, позволяющий пользователям хранить свои данные на серверах в «облаке» и передавать их другим пользователям в Интернете."}]
    ,
    links: [
      { source: "1", target: "2" },
      { source: "1", target: "3" }
    ]
  };

const Filters = (props) => {
    const [open, setOpen] = React.useState(false);
    const [tabVal, settabVal] = React.useState('Фильтрация компаний');
    const [daliogTitle, setDialogTitle] = React.useState('Фильтрация компаний');
    const [compInfo, setCompanyInfo] = React.useState({
        names: [],
        ceos: [],
        departments: []
    });
    const [prodInfo, setProductInfo] = React.useState({
        names: []
    });

    React.useEffect(() => {
        var companyInfo = {
            names: [],
            ceos: [],
            departments: []
        };

        var productInfo = {
            names: []
        }

        let query = '';
        for (let i = 0; i < props.data.nodes.length; ++i) {
            if (props.data.nodes[i].nodeType == "Компания") {
                query = "http://localhost:7328/company?id=" + props.data.nodes[i].id;
                axios.get(query).then((response) => {
                        if (!companyInfo.names.includes(response.data.name)) {
                            companyInfo.names.push(response.data.name);
                        }
                        
                        if (!companyInfo.ceos.includes(response.data.ceo)) {
                            companyInfo.ceos.push(response.data.ceo);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            else if (props.data.nodes[i].nodeType == "Продукт") {
                query = "http://localhost:7328/product?id=" + props.data.nodes[i].id;
                axios.get(query).then((response) => {
                        if (!productInfo.names.includes(response.data.name)) {
                            productInfo.names.push(response.data.name);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }

        axios.get("http://localhost:7328/departments").then((response) => {
            response.data.map(item => {
                companyInfo.departments.push(item.name);
            })
        })
        .catch(e => {
            console.log(e);
        });

        setCompanyInfo(companyInfo);
        setProductInfo(productInfo);
    }, [props.data])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        settabVal(newValue);
        setDialogTitle(newValue);
    };

    return (
        <Toolbar>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClickOpen}
            >
                <SettingsIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{daliogTitle}</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: 450, typography: 'body1' }}>
                        <TabContext value={tabVal}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                    <Tab label="Компании" value="Фильтрация компаний" />
                                    <Tab label="Продукты и релизы" value="Фильтрация продуктов" />
                                </TabList>
                            </Box>
                            <TabPanel value="Фильтрация компаний">
                                <FormControl sx={{ m: 1, ml: -3, minWidth: 450 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Наименование компании</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        label="Наименование компании"
                                        defaultValue=''
                                    >
                                        {compInfo && compInfo.names.map(item => <MenuItem key={Math.random().toString(36).substring(2, 9)} value={item}>{item}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, ml: -3, minWidth: 450 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Имя владельца</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        label="Имя владельца"
                                        defaultValue=''
                                    >
                                        {compInfo && compInfo.ceos.map(item => <MenuItem key={Math.random().toString(36).substring(2, 9)} value={item}>{item}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Box sx={{ m: 1, ml: -3, width: 450 }}>
                                    <Typography id="track-false-slider" gutterBottom>
                                        Штат сотрудников
                                    </Typography>
                                    <Slider
                                        aria-labelledby="track-false-slider"
                                        defaultValue={[20, 37]}
                                        marks={staffSizeMarks}
                                    />
                                    <Separator />
                                    <Typography id="track-false-range-slider" gutterBottom>
                                        Время существования
                                    </Typography>
                                    <Slider
                                        aria-labelledby="track-false-range-slider"
                                        defaultValue={[20, 37]}
                                        marks={yearMarks}
                                    />
                                </Box>
                                <FormControl sx={{ m: 1, ml: -3, minWidth: 450 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Отрасли</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        label="Отрасли"
                                        defaultValue=''
                                    >
                                        {compInfo && compInfo.departments.map(item => <MenuItem key={Math.random().toString(36).substring(2, 9)} value={item}>{item}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Separator />
                                <Box sx={{ m: 1, ml: -3, width: 450 }}>
                                    <Button variant="contained">Применить</Button>
                                    <Button onClick={(e) => {
                                        props.updateGraphData({newData});
                                    }}
                                    
                                    variant="text">Сбросить</Button>
                                </Box>
                            </TabPanel>
                            <TabPanel value="Фильтрация продуктов">
                                <FormControl sx={{ m: 1, ml: -3, minWidth: 450 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Наименование продукта</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        label="Наименование продукта"
                                        defaultValue=''
                                    >
                                        {prodInfo && prodInfo.names.map(item => <MenuItem key={Math.random().toString(36).substring(2, 9)} value={item}>{item}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Box sx={{ m: 1, ml: -3, width: 450 }}>
                                    <Typography id="track-false-range-slider" gutterBottom>
                                        Время существования
                                    </Typography>
                                    <Slider
                                        aria-labelledby="track-false-range-slider"
                                        defaultValue={[20, 37]}
                                        marks={yearMarks}
                                    />
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label="Релиз подтвержден" />
                                    </FormGroup>
                                    <Separator />
                                    <Button variant="contained">Применить</Button>
                                    <Button variant="text">Сбросить</Button>
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </DialogContent>
            </Dialog>
        </Toolbar>
    )
}

export default Filters;