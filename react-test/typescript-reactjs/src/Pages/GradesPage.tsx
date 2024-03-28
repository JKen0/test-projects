import React, { useState, useEffect } from 'react';
import GradesGrid from '../components/GradesGrid';
import axios from 'axios';

interface GridDataInterface {
  coursecode: string;
  coursename: string;
  term: string;
  grade: string;
  units: number;
  status: string;
  description: string;
}


const GradesPage = () => {
  const [jsonData, setJsonData] = useState<GridDataInterface[]>([]);

  useEffect(() => {
    // Function to fetch JSON data
    const fetchData = async () => {
      try {
        // Fetch JSON data from the server (replace 'data.json' with your file path)
        const response = await axios.get('../testdata/convertcsv.json');
        // Set the fetched data in the state variable
        setJsonData(response.data);

        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after initial render



  return (
    <div>
      <GradesGrid />
    </div>
  )
}

export default GradesPage