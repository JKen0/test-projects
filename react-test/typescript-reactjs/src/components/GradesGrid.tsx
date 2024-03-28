const GradesGrid = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Course Code</th>
          <th scope="col">Course Name</th>
          <th scope="col">Term</th>
          <th scope="col">Grade</th>
          <th scope="col">Units</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  )
}

export default GradesGrid