import React, {
  Component,
  MouseEvent,
  ReactNode,
  FunctionComponent,
} from 'react';
//FC is type for FunctionComponent FC<P> P -props

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void;
  children?: ReactNode;
  color?: string;
};

const Button: FunctionComponent<Props> = (props) => {
  const { onClick: handleClick, color = 'purple', children } = props;

  return (
    <button style={{ color: color }} onClick={handleClick}>
      {children}
    </button>
  );
};
/////

const initialState = { counter: 0 };
type State = typeof initialState;

class ButtonCounter extends Component {
  state: State = initialState;

  render() {
    return (
      <div>
        <Button onClick={this.onButtonIncrement} color="green">
          Increment +
        </Button>
        <Button onClick={this.onButtonDecrement}>Decrement -</Button>
        <div>Counts: {this.state.counter}</div>
      </div>
    );
  }

  onButtonIncrement = () => {
    this.setState((state: State) => ({
      counter: state.counter + 1,
    }));
  };

  onButtonDecrement = () => {
    this.setState((state: State) => ({
      counter: state.counter - 1,
    }));
  };
}

export default ButtonCounter;
