import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import {
  StyledForm,
  BinaryTextInput,
  Label,
  Button,
  DecimalTextInput,
  Field
} from './styles'

function App() {
  const [binaryText, setBinaryText] = useState('')
  const [decimalText, setDecimalText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Function to calculate numbers with decimal places
  const convertWithFraction = binarytext => {
    let number = binarytext.toString().split('.')
    let numberFractionResult = 0
    let result
    for (let i = 0; i < number[1].length ; ++i) {
      let j = (i+1)*-1
      numberFractionResult += number[i] * Math.pow(2, j)
    }
    result = Number(parseInt(number[0]) + numberFractionResult)
    return result
  }

  // Perform the conversion on form submit
  const onFormSubmit = e => {
    e.preventDefault() // prevents refresh of the browser

    // Make sure we accept only either 0 or 1
    if (binaryText.match(/^[0-1]+$/g) === null) {
      setErrorMessage('Enter either 0 or 1')
      return
    }

    setErrorMessage('') // Reset the error message
    
    // Condition if the user wants to convert numbers with decimal places
    if ( binaryText.split('.').length === 2 && binaryText.split('.')[1] ==! null ) {
      const result = convertWithFraction( binaryText );
      setErrorMessage('Enter either 0 or 1')
      // I used to prevent the user from clicking the dot and not (.) the decimal part, and also prevents several (.)
      setDecimalText(result === 'NaN' ? result : '')
      // Condition if the user wants to convert integer number
    } else {

      // Formulae:
      // input = 1 => output = 1 * (2^0) = 1
      // input = 10 => output = (0 * (2^0)) + (1 * (2^1)) = 2
      // So we reverse and iterate from the back
      const reversedBinaryText = binaryText
        .split('')
        .map(Number) // Convert to a number from string
        .reverse()

      // Calculate the result by accumulating previous vaue
      const result = reversedBinaryText.reduce(
        (accumulator, currentValue, idx) =>
          accumulator + currentValue * Math.pow(2, idx)
      )
      setErrorMessage('Enter either 0 or 1')
      // I used to prevent the user from clicking the dot and not (.) the decimal part, and also prevents several (.)
      setDecimalText(result === 'NaN' ? result : '')
    }
  }

  return (
    <>
      <h1>Binary to Decimal Converter</h1>

      <StyledForm onSubmit={onFormSubmit}>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        <br />
        <Field>
          <Label>Binary Input</Label>
          <div>
            <BinaryTextInput
              autoComplete="off"
              type="text"
              name="binary"
              placeholder="Enter 0 or 1"
              value={binaryText}
              onChange={e => setBinaryText(e.target.value)}
            />
            <Button type="submit">Convert</Button>
          </div>
        </Field>
        <Field>
          <Label>Decimal Output</Label>
          <DecimalTextInput
            type="text"
            name="decimal"
            value={decimalText}
            disabled
          />
        </Field>
      </StyledForm>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
