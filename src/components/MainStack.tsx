import * as React from 'react';
import { StyleSheet } from 'react-nativescript';

export const MainStack = () => {
  const [expression, setExpression] = React.useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        setExpression(String(eval(expression)));
      } catch (error) {
        setExpression('Error');
      }
    } else if (value === 'C') {
      setExpression('');
    } 
    else if (value === '<=') {
      setExpression(expression.slice(0, -1));
    } else {
      setExpression(expression + value);
    }
  };

  const mapOperation = ['/', '+', '-', '*'];

  const buttons = [
    '7', '8', '9', '<=', '4', '5', '6', '/', '1', '2', '3', '*', '0', '.', 'C', '-'
  ];

  const renderButton = (button) => (
    <button
      key={button}
      style={
        mapOperation.includes(button)
          ? styles.operationButton
          : button === '<='
          ? styles.eraseButton
          : styles.button
      }
      onTap={() => handleButtonClick(button)}
    >
      {button}
    </button>
  );

  return (
    <flexboxLayout style={styles.container}>
      <flexboxLayout style={styles.outputContainer}>
        <label style={styles.expression}>{expression}</label>
      </flexboxLayout>
      <flexboxLayout style={styles.buttonsContainer}>
        {buttons.map(renderButton)}
      </flexboxLayout>
      <flexboxLayout style={styles.buttonsContainer}>
        <button style={styles.equalsButton} onTap={() => handleButtonClick('=')}>
          =
        </button>
        <button style={styles.operationButton} onTap={() => handleButtonClick('+')}>
          +
        </button>
      </flexboxLayout>
    </flexboxLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: '#303030',
  },
  button: {
    fontSize: 24,
    color: '#222',
    width: '25%',
  },
  operationButton: {
    fontSize: 24,
    color: '#222',
    width: '25%',
    backgroundColor: 'orange'
  },
  eraseButton: {
    fontSize: 24,
    width: '25%',
    backgroundColor: '#c4302b',
    color: '#fff',
  },
  equalsButton: {
    fontSize: 24,
    color: '#222',
    width: '75%',
    backgroundColor: '#eee',
  },
  buttonsContainer: {
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  outputContainer: {
    width: '100%',
    color: '#fff',
  },
  expression: {
    fontSize: 24,
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    textAlignment: 'right',
    padding: '10 30',
    marginBottom: 10,
  },
});
