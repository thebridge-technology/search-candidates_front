import * as React from 'react';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { api } from "/services/api";
import { Button, Paper } from "@mui/material";
import Router from "next/router";
import cookie from 'js-cookie';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const CustomAutocomplete = styled(Autocomplete)`
  padding: 10px;
`;

const formations = [
  { formation: "technological" },
  { formation: "technical_course" },
  { formation: "post_graduate" },
  { formation: "post_doctorate" },
  { formation: "phd" },
  { formation: "master_degree" },
  { formation: "high_school" },
  { formation: "graduation" },
  { formation: "elementary_school" },
  { formation: "Technical" },
  { formation: "Post Graduation" },
  { formation: "PHD" },
  { formation: "Năo é necessário graduaçăo" },
  { formation: "Mestrado" },
  { formation: "Graduaçăo Cursando" },
  { formation: "Graduation Incomplete" },
  { formation: "Graduation Complete" },
]

const languages = [
  { language: "Alemăo" },
  { language: "Espanhol" },
  { language: "Francês" },
  { language: "Inglês" },
  { language: "Italiano" },
  { language: "Português" }
]

const CustomLogout = styled('div')`
  position: absolute;
  bottom: 10px;
  margin: 10px;
  width: -webkit-fill-available;
  display: grid;
  span {
    justify-self: center;
  }
`;

const Filters = ({ setSkills, setLevelsCurrent, setStatesCurrent, setLanguagesCurrent, setFormationsCurrent }) => {
  const [levels, setLevels] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [states, setStates] = useState([]);
  useEffect(() => {
    getLevels();
    getStacks();
    getStates();
  }, []);
  
  async function getLevels() {
    const { data } = await api.get('/level')
    setLevels(data)
  }
  
  async function getStacks() {
    const { data } = await api.get('/stack')
    setStacks(data)
  }
  
  async function getStates() {
    const { data } = await api.get('/state')
    setStates(data)
  }
  
  
  const handleChangeLevel = (event, value) => {
    let selectLevels = []
    value.forEach((item) => {
      selectLevels.push(item.level)
    })
    setLevelsCurrent({ "levels": selectLevels })
  };
  
  const handleChangeSkill = (event, value) => {
    let selectSkills = []
    value.forEach((item) => {
      selectSkills.push(item.tech_stack_expertise)
    })
    setSkills({ "skills": selectSkills })
  };
  
  const handleChangeStates = (event, value) => {
    let selectStates = []
    value.forEach((item) => {
      selectStates.push(item.state)
    })
    setStatesCurrent({ "states": selectStates })
  };
  
  const handleChangeLanguages = (event, value) => {
    let selectLanguages = []
    value.forEach((item) => {
      selectLanguages.push(item.language)
    })
    setLanguagesCurrent({ "languages": selectLanguages })
  };
  
  const handleChangeFormation = (event, value) => {
    let selectFormation = []
    value.forEach((item) => {
      selectFormation.push(item.formation)
    })
    setFormationsCurrent({ "formations": selectFormation })
  };
  
  const Logout = () => {
    cookie.remove('token');
    Router.push('/login')
  }
  
  return (
    <>
      <CustomAutocomplete
        multiple
        limitTags={2}
        id="checkboxes-tags-demo"
        options={levels ? levels : []}
        disableCloseOnSelect
        getOptionLabel={(option) => option.level}
        onChange={handleChangeLevel}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.level}
          </li>
        )}
        style={{ width: 500, maxWidth: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Level" placeholder="Seniority"/>
        )}
      />
      <Divider/>
      <CustomAutocomplete
        multiple
        limitTags={2}
        id="checkboxes-tags-demo"
        options={stacks ? stacks : []}
        disableCloseOnSelect
        onChange={handleChangeSkill}
        getOptionLabel={(option) => option.tech_stack_expertise}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.tech_stack_expertise}
          </li>
        )}
        style={{ width: 500, maxWidth: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Tech stack expertise" placeholder="Tech stack expertise"/>
        )}
      />
      <Divider/>
      <CustomAutocomplete
        multiple
        limitTags={2}
        id="checkboxes-tags-demo"
        options={states ? states : []}
        disableCloseOnSelect
        onChange={handleChangeStates}
        getOptionLabel={(option) => option.state}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.state}
          </li>
        )}
        style={{ width: 500, maxWidth: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="State" placeholder="State"/>
        )}
      />
      <Divider/>
      <CustomAutocomplete
        multiple
        limitTags={2}
        id="checkboxes-tags-demo"
        options={languages ? languages : []}
        disableCloseOnSelect
        onChange={handleChangeLanguages}
        getOptionLabel={(option) => option.language}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.language}
          </li>
        )}
        style={{ width: 500, maxWidth: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Language" placeholder="Language"/>
        )}
      />
      <Divider/>
      <CustomAutocomplete
        multiple
        limitTags={2}
        id="checkboxes-tags-demo"
        options={formations ? formations : []}
        disableCloseOnSelect
        onChange={handleChangeFormation}
        getOptionLabel={(option) => option.formation}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.formation}
          </li>
        )}
        style={{ width: 500, maxWidth: '100%' }}
        renderInput={(params) => (
          <TextField {...params} label="Formation" placeholder="Formation"/>
        )}
      />
      <Divider/>
      <CustomLogout>
        <Button variant="contained" color="error" onClick={Logout}>Logout</Button>
      </CustomLogout>
    </>
  );
}

export default Filters;