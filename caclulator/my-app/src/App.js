import { useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// all buttons for the calculator
const calculatorButtons = [
  ['x²', '√x', '1/x', '⌫'],
  ['sin', 'cos', 'tan', 'ln'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['3', '2', '1', '-'],
  ['0', '.', '=', '+'],
  ['+/-', 'C']
]

const App = () => {
  const [display, setDisplay] = useState('');


  const handleButtonClick = (value) => {
    const sanitizedDisplay = display
      .replace('÷', '/')
      .replace('×', '*');


    // clear display
    if (value === 'C') {
      setDisplay('');


      // deal with back button
    } else if (value === '⌫') {
      setDisplay(display.slice(0, -1));


      // deal with pressing equal button
    } else if (value === '=') {
      try {
        const result = eval(sanitizedDisplay);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with square button
    } else if (value === 'x²') {
      try {
        const result = eval(sanitizedDisplay) * eval(sanitizedDisplay);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with square root button
    } else if (value === '√x') {
      try {
        const result = Math.sqrt(eval(sanitizedDisplay));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with negation button
    } else if (value === '+/-') {
      setDisplay((prev) => {
        if (prev.startsWith('-')) {
          return prev.substring(1);
        } else {
          return '-' + prev;
        }
      });

      // deal with reciprical button
    } else if (value === '1/x') {
      try {
        const result = 1 / (eval(sanitizedDisplay));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with sin button
    } else if (value === 'sin') {
      try {
        const result = Math.sin(eval(sanitizedDisplay));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with cos button
    } else if (value === 'cos') {
      try {
        const result = Math.cos(eval(sanitizedDisplay));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with tan button
    } else if (value === 'tan') {
      try {
        const result = Math.tan(eval(sanitizedDisplay));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with natural log button
    } else if (value === 'ln') {
      try {
        const result = Math.log(eval(sanitizedDisplay));
        setDisplay(result.toString());
      } catch (error) {
        setDisplay('Error');
      }

      // deal with every other button
    } else {
      setDisplay((prev) => prev + value);


    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={display}
        disabled
        sx={{ mb: 2 }}
      />

      <Grid container spacing={1}>
        {// map all the buttons from the calculator array
          calculatorButtons.flat().map((value) => (
            <Grid item xs={value === "C" ? 9 : 3} key={value}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleButtonClick(value)}
                disabled={value !== "C" && (display === "Error" || display === "NaN") ? true : false}
                color={value === "C" ? 'secondary' : 'primary'}

              >
                {value}
              </Button>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default App;
