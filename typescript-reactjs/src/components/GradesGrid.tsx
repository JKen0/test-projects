import { useState, useEffect } from 'react';
import { GridDataInterface } from "../Types/GridDataTypes";
import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import { process, State, DataResult } from "@progress/kendo-data-query";

interface Props {
  gridData: GridDataInterface[];
}

const GradesGrid = ({ gridData }: Props) => {
  //const [dataState, setDataState] = .useState<State>(initialDataState);
  //const [dataResult, setDataResult] = useState<DataResult>(
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const calculatePixelsFromPercent = (percent: number) => {
    return (percent / 100) * browserWidth;
  };

  return (
    <div>
      <Grid
        //style={{ height: "420px" }}
        data={gridData}
        scrollable='none'
      >
        <Column width={calculatePixelsFromPercent(3)} field="" title="+" />
        <Column width={calculatePixelsFromPercent(20)} field="CourseCode" title="Course Code" />
        <Column width={calculatePixelsFromPercent(35)} field="CourseName" title="Course Name" />
        <Column width={calculatePixelsFromPercent(20)} field="Term" title="Term" />
        <Column width={calculatePixelsFromPercent(10)} field="Grade" title="Grade" />
        <Column width={calculatePixelsFromPercent(10)} field="Units" title="Units" />
      </Grid>
    </div>
  );
}

export default GradesGrid