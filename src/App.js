import React, { Component } from 'react';
import CountUp from 'react-countup';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flirt: '',
            isSerious: true,
            isMean: false,
            count: 0,
        };

        this.generate = this.generate.bind(this);
    }

    componentDidMount() {
        this.generate();

        fetch('/api/se/count').then(result => {
            if (result.ok) {
                return result.text();
            }

            return '0';
        }).then(count => this.setState({count}));
    }

    generate() {
        const { isSerious, isMean } = this.state;
        fetch(`/api/se?serious=${isSerious}&mean=${isMean}`).then(result => {
            if (result.ok) {
                return result.text();
            }

            return '';
        }).then(flirt => this.setState({flirt}));
    }

    render() {
        const { flirt, isSerious, isMean, count } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Välkommen till <b>Pontus Raggningsreplikgenerator</b>!
                    </p>
                </header>
                <body className="App-body">
                    <p className="App-flirt">{flirt}</p>
                    <div>
                        <button className="btn-generate" onClick={this.generate}>Generera</button>
                        <div className="App-settings">
                            <div className="App-settings-item">
                                <input className="checkbox" type="checkbox" checked={!isSerious} onClick={() => this.setState({isSerious: !isSerious})} />
                                <label>Konstigt</label>
                            </div>
                            <div className="App-settings-item">
                                <input type="checkbox" className="checkbox" checked={isMean} onClick={() => this.setState({isMean: !isMean})} />
                                <label>Elakt</label>
                            </div>
                        </div>
                    </div>
                </body>
                <footer>
                    <div className="App-countup">

                        <CountUp start="0" end={count} separator=" " duration="10" />
                        <p className="App-countup-text">Antal raggningsrepliker tillgängliga just nu.</p>
                    </div>
                    <p className="App-footer">Appens utvecklare <a href="https://github.com/pontusstjerna">Pontus Drejer</a> vill höja ett varningens finger för att du
                    i sällsynta fall ej får ragg genom att använda denna sida. Det är också helt utom utvecklarens ansvar vilka konsekvenser det får. Används helt på egen risk.</p>
                </footer>
            </div>
        );
    }
}

export default App;
