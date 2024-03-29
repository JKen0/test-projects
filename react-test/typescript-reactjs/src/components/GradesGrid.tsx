import { GridDataInterface } from "../Types/GridDataTypes";
import Table from 'react-bootstrap/Table';

interface Props {
  gridData: GridDataInterface[];
}

const GradesGrid = ({ gridData }: Props) => {


  // Function to render table rows based on JSON data
  const renderTableRows = () => {
    return gridData.map((item, index) => (
      <tr key={index}>
        <td>+</td>
        <td>{item.CourseCode}</td>
        <td>{item.CourseName}</td>
        <td>{item.Term}</td>
        <td>{item.Grade}</td>
        <td>{item.Units}</td>
        <td>{item.Status}</td>
        <td>{item.Description}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Grades Table</h2>
      <Table striped bordered hover variant="dark" >
        <thead>
          <tr>
            <th>+</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Term</th>
            <th>Grade</th>
            <th>Units</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamically render table rows */}
          {renderTableRows()}
        </tbody>
      </Table>
    </div>
  );
}

export default GradesGrid