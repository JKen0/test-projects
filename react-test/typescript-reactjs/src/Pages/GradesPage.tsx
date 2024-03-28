import React, { useState, useEffect } from 'react';
import GradesGrid from '../components/GradesGrid';
import axios from 'axios';
import testData from '../testData/convertcsv.json';

interface GridDataInterface {
  CourseCode: string;
  CourseName: string;
  Term: string;
  Grade: string;
  Units: number;
  Status: string;
  Description: string;
}


const GradesPage = () => {
  const [jsonData, setJsonData] = useState<GridDataInterface[]>([]);

  useEffect(() => {
    // Fetch JSON data from your API or local file
    const fetchData = async () => {
      try {
        setJsonData(testData);
        console.log('hello world');
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <GradesGrid gridData={jsonData} />
    </div>
  )
}

export default GradesPage