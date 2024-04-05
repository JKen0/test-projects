import { useState } from 'react'
import ListGroup from '../components/ListGroup';
import Alert from '../components/Alert';
import Button from '../components/Button';
import 'bootstrap/dist/css/bootstrap.css';
import MultipleSelectPlaceholder from '../components/test';

const HomePage = () => {
    const items = [
        'New York',
        'San Franciso',
        'Tokyo',
        'Paris', 
        'London',
        'Toronto'
    ]

    const [showAlert, setShowAlert] = useState(false);

    const handleSelectItem = (item: string) => {{
      console.log(item);
    }}

    return (
        <div>
          <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />    
          {showAlert && <Alert onClickCloseButton={() => {setShowAlert(false)}}>Hello <span>World</span> DinkDonk!</Alert>}

        <MultipleSelectPlaceholder />
          <Button buttonText = "Primary" onClick={() => {setShowAlert(true)}} />


        </div>
    )
}

export default HomePage