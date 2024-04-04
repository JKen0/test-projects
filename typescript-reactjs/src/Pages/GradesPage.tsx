import { useState, useEffect } from 'react';
import GradesGrid from '../components/GradesGrid';
import axios from 'axios';
import testData from '../testData/convertcsv.json';
import { GridDataInterface } from '../Types/GridDataTypes';
import GridFilterBar from '../components/GridFilterBar';
import { FilterOptionInterface, GridLayoutTypes, CareerCount, DepartmentCount } from '../Types/GridDataTypes';
import { json } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';

const GradesPage = () => {
  const [jsonData, setJsonData] = useState<GridDataInterface[]>([]);
  const [filteredData, setFilteredData] = useState<GridDataInterface[]>([]);

  const [filterOptions, setFilterOptions] = useState<FilterOptionInterface>({
    careerOptions: [] as CareerCount[],
    departmentOptions: [] as DepartmentCount[]
  });


  const [selectedFilters, setSelectedFilters] = useState({
    gridLayoutFilter: "normal" as GridLayoutTypes,
    careerFilter: "All",
    departmentFilter: filterOptions.departmentOptions.map(item => item.department)
  });


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
    } else if (filterName == "filterDepartments") {
      setSelectedFilters({
        ...selectedFilters,
        departmentFilter: typeof newValue === 'string' ? newValue.split(',') : newValue
      });
    }
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

    setFilterOptions({
      ...filterOptions,
      careerOptions: careersWithCount,
      departmentOptions: departmentsWithCount
    })


    return;
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
    const fetchData = () => {
      try {
        setJsonData(testData);
        console.log('got test data');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setFilteredData(jsonData);
  }, []);


  useEffect(() => {
    // Call fetchUniqueValuesWithCount only when jsonData changes
    if (jsonData.length > 0) {
      fetchUniqueValuesWithCount(jsonData);

      setSelectedFilters({
        ...selectedFilters,
        departmentFilter: filterOptions.departmentOptions.map(item => item.department)
      });


    }

    setFilteredData(jsonData);
  }, [jsonData]);

  useEffect(() => {
    // when filters change, filter the data accordingly 
    handleDataFilter();
  }, [selectedFilters]);




  return (
    <div style={{ minWidth: "800px" }}>
      <GridFilterBar filterOptions={filterOptions} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
      <GradesGrid gridData={filteredData} />
    </div>
  )
}

export default GradesPage