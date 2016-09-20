import React from 'react';
import ReactDOM from 'react-dom';
import Ajax from './tools/ajax.jsx';
import Login from './login.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
  }

  componentWillMount() {
    Ajax.get('http://localhost:8900',
            r => {
              console.log(r);
              this.setState({
                user: r,
              });
            }
    );
  }

  render() {
    let render;
    if (this.state.user !== undefined) {
      render = (<div>欢迎回来，{this.state.user.username}</div>);
    } else {
      render = <Login />;
    }
    return render;
  }
}

export default Main;
