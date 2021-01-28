import './App.css';
import { Component } from 'react';
import { serialize, deserialize } from 'bson';

const SERVER = 'localhost:8443';

type StateType = {
	serverOnline: Boolean
	serverKeysExchanging: Boolean
	serverKeysExchanged: Boolean
}

class App extends Component<{}, StateType> {
	constructor(props: any) {
		super(props);
		this.state = {
			serverOnline: false,
			serverKeysExchanging: false,
			serverKeysExchanged: false
		};
		//this.function = this.function.bind(this);
	}

	componentDidMount() {
		fetch(`https://${SERVER}`).then(res => res.text()).then(result => {
			if (result === 'true') this.setState({
				serverOnline: true,
				serverKeysExchanging: true
			});
		})
	}

	componentDidUpdate() {
		if (this.state.serverOnline && (this.state.serverKeysExchanging && !this.state.serverKeysExchanged)) {
			const ws = new WebSocket(`wss://${SERVER}`);
			ws.binaryType = 'arraybuffer';
			ws.onmessage = e => {
				console.log(deserialize(e.data));
			};
			  
			ws.onclose = () => {
				this.setState({
					serverOnline: false
				})
			};
			  
		}
	}

	render() {
	  	return (
			<div className="App">
				<h1>CommLink WebClient</h1>
				{
					this.state.serverOnline ? (
						this.state.serverKeysExchanging ? (
							this.state.serverKeysExchanged ? (
								<p></p>
							) : (
								<p>Exchanging keys with server...</p>
							)
						) : (
							<p>Error while exchanging keys with server.</p>
						)
					) : (
						<p>Server not online!</p>
					)
				}
			</div>  
		)
	}
}

export default App;
