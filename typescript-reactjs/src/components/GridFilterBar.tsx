import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';


type GridLayoutTypes = "normal" | "term-grouping";

const departmantNames = [
    'Mathematics & Statistics',
    'Computing & Software',
    'Economics',
    'Korean',
    'Physics',

];


const GridFilterBar = () => {
    const [gridLayout, setGridLayout] = useState<GridLayoutTypes>("normal");
    const [careerFilter, setCareerFilter] = useState("all");
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>(departmantNames);

    const handleFilterChange = (event: SelectChangeEvent) => {
        const filterName = event.target.name;
        const newValue = event.target.value;

        if (filterName == "filterGridLayout") {
            const newGridLayOutOption = event.target.value as GridLayoutTypes;
            setGridLayout(newGridLayOutOption);
        } else if (filterName == "filterCareer") {
            setCareerFilter(newValue);
        } else if (filterName == "filterName") {
            setSelectedDepartments(typeof newValue === 'string' ? newValue.split(',') : newValue);
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 175 }}>
                <InputLabel id="demo-simple-select-helper-label">Layout</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={gridLayout}
                    label="Grid Layout"
                    onChange={handleFilterChange}
                    name="filterGridLayout"
                >
                    <MenuItem value={"normal"}>Normal</MenuItem>
                    <MenuItem value={"term-grouping"}>Group By Term</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label">Academic Career</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={careerFilter}
                    label="Degree"
                    onChange={handleFilterChange}
                    name="filterCareer"
                >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"graduate"}>Graduate Courses</MenuItem>
                    <MenuItem value={"undergraduate"}>Undergraduate Courses</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel id="demo-multiple-checkbox-label">Department</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedDepartments}
                    onChange={handleFilterChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => {
                        if (selected.length === 1) {
                            return selected[0];
                        } else if (selected.length == departmantNames.length) {
                            return "All Departments Selected";
                        } else if (selected.length > 1) {
                            return `${selected.length} Departments Selected`;
                        } else {
                            return ''; // Return an empty string if no items are selected
                        }
                    }}
                    name="filterName"
                >
                    {departmantNames.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedDepartments.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default GridFilterBar