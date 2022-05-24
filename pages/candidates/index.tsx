import { GetServerSideProps, NextPage } from 'next'
import nextCookie from "next-cookies";
import * as React from 'react';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import Router from "next/router";

import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import logo from '/public/static/icons/logo.svg';
import ListCard from "./_list";
import Filters from "./_filters";
import { api } from "/services/api";
import { Pagination } from "@mui/material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const CustomLogo = styled(Typography)`
  font-size: 44px;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  padding-right: 150px;
`;

const CustomToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  overflowX: 'hidden',
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const CustomIconButton = styled(IconButton)`
  z-index: 99;
`;

const TextFilters = styled("div")`
  width: 100%;
  text-align: center;
  font-size: 2em;
  margin: 0.67em 0;
  font-weight: 400;
  line-height: 110%;
`;

const CustomPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const Candidates: NextPage = props => {
  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(null);
  const [quantityPages, setQuantityPages] = useState(0)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [searchName, setSearchName] = useState({})
  const [skills, setSkills] = useState({})
  const [levelsCurrent, setLevelsCurrent] = useState({})
  const [statesCurrent, setStatesCurrent] = useState({})
  const [languagesCurrent, setLanguagesCurrent] = useState({})
  const [formationsCurrent, setFormationsCurrent] = useState({})
  
  useEffect(() => {
    getCandidates();
  }, [
    searchName,
    pageCurrent,
    skills,
    levelsCurrent,
    statesCurrent,
    languagesCurrent,
    formationsCurrent
  ]);
  
  async function getCandidates() {
    const token = cookie.get("token");
    if (!token) {
      Router.push('/login');
    }
    api.setHeader("Authorization", token);
    const { data } = await api.get('/candidates', {
      ...searchName,
      ...skills,
      ...levelsCurrent,
      ...statesCurrent,
      ...languagesCurrent,
      ...formationsCurrent,
      'page': pageCurrent
    })
    if (data) {
      setTotal(data.total)
      setQuantityPages(data.total_pages)
      setCandidates(data.data)
    }
  }
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const onPress = (value) => {
    setPageCurrent(1);
    setSearchName({ ...searchName, name: value.target.value })
  }
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleChange = (_event, value) => {
    setPageCurrent(value);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar position="fixed" open={open}>
        <CustomToolbar>
          <CustomIconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </CustomIconButton>
          <CustomLogo
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            <img src={logo.src} alt="The Bridge" className="logo"/>
          </CustomLogo>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              onBlur={event => onPress(event)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon/>
            </IconButton>
          </Search>
        </CustomToolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            maxWidth: '100%',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <TextFilters>Filters</TextFilters>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <Filters
          setSkills={setSkills}
          setLevelsCurrent={setLevelsCurrent}
          setStatesCurrent={setStatesCurrent}
          setLanguagesCurrent={setLanguagesCurrent}
          setFormationsCurrent={setFormationsCurrent}
        />
        <Divider/>
      </Drawer>
      <Main open={open}>
        <DrawerHeader/>
        <div>
          Result: {total}
        </div>
        <ListCard candidates={candidates}/>
        <CustomPagination
          count={quantityPages}
          color="primary"
          page={pageCurrent}
          onChange={handleChange}
        />
      </Main>
    </Box>
  );
}

export default Candidates;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nextCookie(ctx) ? nextCookie(ctx) : ctx.req.headers.cookie["token"];
  const redirectOnError = () => {
    if (typeof window !== "undefined") {
      Router.push("/login");
    } else {
      ctx.res.writeHead(307, { Location: "/login" });
      ctx.res.end();
    }
  };
  return {
    props: {
      user: 'null',
    },
  };
}