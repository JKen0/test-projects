import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ListGroup from './components/ListGroup';
import Alert from './components/Alert';
import Button from './components/Button';

function App() {
    const items = [
        'New York',
        'San Franciso',
        'Tokyo',
        'Paris', 
        'London',
        'Toronto'
    ]

    const handleSelectItem = (item: string) => {{
      console.log(item);
    }}

    return (
        <div>
          <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />    
          <Alert>
            Hello <span>World</span>
          </Alert>
          <Button buttonText = "Primary" buttonType='primary' />
          <Button buttonText = "Secondary" buttonType='secondary' />
          <Button buttonText = "Success" buttonType='success' />
          <Button buttonText = "Danger" buttonType='danger' />
        </div>
    )
}

export default App;
