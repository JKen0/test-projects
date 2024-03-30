import { useState } from 'react'
import ListGroup from '../components/ListGroup';
import Alert from '../components/Alert';
import Button from '../components/Button';
import 'bootstrap/dist/css/bootstrap.css'

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


          <Button buttonText = "Primary" onClick={() => {setShowAlert(true)}} />


        <picture>
          <img height={30} src="https://cdn.7tv.app/emote/643c96089137f98b004c8d5f/2x.webp" />
        </picture>
        </div>
    )
}

export default HomePage