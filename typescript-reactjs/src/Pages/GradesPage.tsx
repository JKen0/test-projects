import { useState, useEffect } from 'react';
import GradesGrid from '../components/GradesGrid';
import GradesGridGrouping from '../components/GradesGridGrouping';
import axios from 'axios';
import gradesdata from '../testData/gradesdata.json';
import { GridDataInterface } from '../Types/GridDataTypes';
import GridFilterBar from '../components/GridFilterBar';
import { FilterOptionInterface, GridLayoutTypes, CareerCount, DepartmentCount } from '../Types/GridDataTypes';
import { json } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import GradesHelpModal from '../components/GradesHelpModal';

const GradesPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const initialGridLayout = queryParams.has('gridlayout') ? queryParams.get('gridlayout') as GridLayoutTypes : "normal";
  const [jsonData, setJsonData] = useState<GridDataInterface[]>([]);
  const [filteredData, setFilteredData] = useState<GridDataInterface[]>([]);
  const [disableFilters, setDisableFilters] = useState<boolean>(false);
  const [modalShowing, setSetModalShowing] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptionInterface>({
    careerOptions: [] as CareerCount[],
    departmentOptions: [] as DepartmentCount[]
  });
  const [selectedFilters, setSelectedFilters] = useState({
    gridLayoutFilter: initialGridLayout,
    careerFilter: "",
    departmentFilter: filterOptions.departmentOptions.map(item => item.department) as string[]
  });


  const openModal = () => {
    setSetModalShowing(true);
  }

  const closeModal = () => {
    setSetModalShowing(false);
  }


  const handleFilterChange = (event: SelectChangeEvent) => {
    const filterName = event.target.name;
    const newValue = event.target.value;


    if (filterName == "filterGridLayout") {
      const newGridLayOutOption = event.target.value as GridLayoutTypes;
      setSelectedFilters({
        ...selectedFilters,
        gridLayoutFilter: newGridLayOutOption
      });
    } else if (filterName == "filterCareer") {
      setSelectedFilters({
        ...selectedFilters,
        careerFilter: newValue
      });
    }
    /*
    else if (filterName == "filterDepartments") {
      const { target: { value }, } = event;
      setSelectedFilters({
        ...selectedFilters,
        departmentFilter: typeof newValue === 'string' ? newValue.split(',') : newValue
      });

    */
    };

  const handleChangeDepartments = (event: SelectChangeEvent<typeof selectedFilters.departmentFilter>) => {
    const { target: { value } } = event;

    setSelectedFilters({
      ...selectedFilters,
      departmentFilter: typeof value === 'string' ? value.split(',') : value
    });
  };


  // Function to fetch unique values along with count from gridData
  const fetchUniqueValuesWithCount = (data: GridDataInterface[]) => {
    const departmentMap: Map<string, number> = new Map();
    const careerMap: Map<string, number> = new Map();

    // Iterate over gridData to populate departmentMap and careerMap
    data.forEach((item) => {
      // Update departmentMap
      const departmentCount = departmentMap.get(item.Department) || 0;
      departmentMap.set(item.Department, departmentCount + 1);

      // Update careerMap
      const careerCount = careerMap.get(item.Career) || 0;
      careerMap.set(item.Career, careerCount + 1);
    });

    // Convert maps to arrays of objects with department/career and count
    const departmentsWithCount = Array.from(departmentMap.entries()).map(([department, count]) => ({ department, count }));
    const careersWithCount = Array.from(careerMap.entries()).map(([career, count]) => ({ career, count }));

    // Calculate the total count of all careers
    const totalCount = careersWithCount.reduce((acc, cur) => acc + cur.count, 0);

    // Add an "All" option with the total count
    const allOption = { career: "All", count: totalCount };
    careersWithCount.unshift(allOption);

    // Sort arrays by department name and career
    departmentsWithCount.sort((a, b) => a.department.localeCompare(b.department));
    careersWithCount.sort((a, b) => a.career.localeCompare(b.career));


    // set initial filter options
    setFilterOptions({
      ...filterOptions,
      careerOptions: careersWithCount,
      departmentOptions: departmentsWithCount
    });

    return true;
  };

  const handleDataFilter = () => {
    const newFilteredData = jsonData.filter(item => {
      const isCareerMatch = selectedFilters.careerFilter === "All" || item["Career"] === selectedFilters.careerFilter;

      const isDepartmentMatch = selectedFilters.departmentFilter.includes(item["Department"]);

      return isCareerMatch && isDepartmentMatch
    });

    setFilteredData(newFilteredData);
  };



  useEffect(() => {
    // Fetch JSON data from your API or local file
    setJsonData(gradesdata);
    console.log('got test grade data');
  }, []);

  useEffect(() => {

    fetchUniqueValuesWithCount(jsonData);
    setFilteredData(jsonData);
  }, [jsonData]);


  // populate filter selections when the filter options load
  useEffect(() => {
  // set initial selected filters
    setSelectedFilters({
      ...selectedFilters,
      careerFilter: "All",
      departmentFilter: filterOptions.departmentOptions.map(item => item.department)
    });
  }, [filterOptions]);


  // filter data onn grid type change
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('gridlayout', selectedFilters.gridLayoutFilter);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

    if (selectedFilters.gridLayoutFilter === "term-grouping") {
      setDisableFilters(true);
      resetFilters();
    } else {
      // when filters change, filter the data accordingly 
      handleDataFilter();
      setDisableFilters(false);
    }



  }, [selectedFilters.gridLayoutFilter]);

  // filter data
  useEffect(() => {
    handleDataFilter();
  }, [selectedFilters.careerFilter, selectedFilters.departmentFilter]);



  const resetFilters = () => {
    setSelectedFilters({
      ...selectedFilters,
      careerFilter: "All",
      departmentFilter: filterOptions.departmentOptions.map(item => item.department)
    });
  };

  return (
    <div style={{ minWidth: "800px" }}>
      <GridFilterBar filterOptions={filterOptions} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} handleChangeDepartments={handleChangeDepartments} resetFilters={resetFilters} disableFilters={disableFilters} />
      {selectedFilters.gridLayoutFilter === "normal" && <GradesGrid gridData={filteredData} setModalOpen={openModal} />}
      {selectedFilters.gridLayoutFilter === "term-grouping" && <GradesGridGrouping gridData={jsonData} setModalOpen={openModal} />}
      <GradesHelpModal open={modalShowing} handleClose={closeModal} />
    </div>
  )
}

export default GradesPage