import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FilterOptionInterface, SelectedFilterInterface } from '../Types/GridDataTypes';
import Button from '@mui/material/Button';

interface GridFilterBarProps {
    filterOptions: FilterOptionInterface;
    selectedFilters: SelectedFilterInterface,
    handleFilterChange: (event: SelectChangeEvent) => void;
    handleChangeDepartments: (event: SelectChangeEvent<string[]>) => void;
    resetFilters: () => void;
    disableFilters: boolean;
}

const GridFilterBar = ({ filterOptions, selectedFilters, handleFilterChange, resetFilters, disableFilters, handleChangeDepartments }: GridFilterBarProps) => {

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 175 }}>
                <InputLabel id="demo-simple-select-helper-label">Layout</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedFilters.gridLayoutFilter}
                    onChange={handleFilterChange}
                    name="filterGridLayout"
                    defaultValue={selectedFilters.gridLayoutFilter}
                >
                    <MenuItem value={"normal"}>Normal</MenuItem>
                    <MenuItem value={"term-grouping"}>Group By Term</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 275 }}>
                <InputLabel id="demo-simple-select-helper-label">Academic Career</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    onChange={handleFilterChange}
                    name="filterCareer"
                    value={selectedFilters.careerFilter}
                    disabled={disableFilters}

                >
                    {filterOptions.careerOptions.map((ele, index) => (
                        <MenuItem key={index} value={ele.career} >{`${ele.career} Courses (${ele.count})`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Department</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple={true}
                    disabled={disableFilters}
                    value={selectedFilters.departmentFilter}
                    onChange={handleChangeDepartments}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => {
                        if (selected.length === 1) {
                            return selected[0];
                        } else if (selected.length == filterOptions.departmentOptions.length) {
                            return "All Departments Selected";
                        } else if (selected.length > 1) {
                            return `${selected.length} Departments Selected`;
                        } else {
                            return 'No Departments Selected'; // Return an empty string if no items are selected
                        }
                    }}
                    name="filterDepartments"
                >
                    {filterOptions.departmentOptions.map((ele) => (
                        <MenuItem key={ele.department} value={ele.department}>
                            <Checkbox checked={selectedFilters.departmentFilter.includes(ele.department)} />
                            <ListItemText>{`${ele.department} (${ele.count})`}</ListItemText>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                sx={{ m: 1, width: 65, height: 54, marginLeft: 2 }} // Adjust marginLeft to push the button to the right
                variant="outlined"
                onClick={resetFilters}
                disabled={disableFilters}
            >
                RESET
            </Button>
        </div>
    );
}

export default GridFilterBar