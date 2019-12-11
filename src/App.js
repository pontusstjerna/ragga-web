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
            useBusiness: false,
            count: 0,
            loading: true,
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
        const { isSerious, isMean, useBusiness } = this.state;
        fetch(`/api/se?serious=${isSerious}&mean=${isMean}&business=${useBusiness}`).then(result => {
            if (result.ok) {
                return result.text();
            }

            return '';
        }).then(flirt => this.setState({flirt, loading: false}));
        this.setState({loading: true});
    }

    render() {
        const { flirt, isSerious, isMean, useBusiness, count, loading } = this.state;

        return (
            <div className="App">
                <div className="App-body">
                    <div className="App-header">
                        <h1>Pontus Raggningsreplikgenerator</h1>
                    </div>
                    <div className="App-flirt">
                        <h2 className={"App-flirt-text " + (loading ? "App-flirt-text__loading" : "")}>{flirt}</h2>
                    </div>
                    <div>
                        <button className="btn-generate" onClick={this.generate}><b>Generera</b></button>
                        <div className="App-settings">
                            <div className="App-settings-item">
                                <input className="checkbox" type="checkbox" checked={!isSerious} onClick={() => this.setState({isSerious: !isSerious})} />
                                <label>Konstigt</label>
                            </div>
                            <div className="App-settings-item">
                                <input type="checkbox" className="checkbox" checked={isMean} onClick={() => this.setState({isMean: !isMean})} />
                                <label>Elakt</label>
                            </div>
                            <div className="App-settings-item">
                                <input type="checkbox" className="checkbox" checked={useBusiness} onClick={() => this.setState({useBusiness: !useBusiness})} />
                                <label><a href="https://foretagsnamngenerator.se">Företag</a></label>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="App-countup">
                        <p className="App-countup-text">Just nu finns det {<CountUp start="0" end={count} separator=" " duration="10" />} tillgängliga raggningsrepliker.</p>
                    </div>
                    <p className="App-footer">Appens utvecklare <a href="https://github.com/pontusstjerna">Pontus Drejer</a> vill höja ett varningens finger för att du
                    i sällsynta fall ej får ragg genom att använda denna sida. Det är också helt utom utvecklarens ansvar vilka konsekvenser det får. Används helt på egen risk.</p>
                </footer>
            </div>
        );
    }
}

export default App;
