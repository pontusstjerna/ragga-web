import React, { Component } from 'react';
import { generateSE } from 'autoflirt';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flirt: '',
            isSerious: true,
            isMean: false,
        };

        this.generate = this.generate.bind(this);
    }

    generate() {
        const { isSerious, isMean } = this.state;
        this.setState({flirt: generateSE(isSerious, isMean)});
    }

    render() {
        const { flirt, isSerious, isMean } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Välkommen till <b>Pontus Raggningsreplikgenerator</b>! <br />Tryck på knappen nedan för att generera en
                        raggningsreplik.
                    </p>
                </header>
                <body>
                    <p className={"App-flirt" + flirt ? '' : 'App-flirt-hidden'}>{flirt ? flirt : 'aaa'}</p>
                    <button className="btn-generate" onClick={this.generate}>Generera</button>

                    <div className="app-settings">
                        <input type="checkbox" checked={!isSerious} onClick={() => this.setState({isSerious: !isSerious})} />
                        <label>Konstigt</label>
                        <input type="checkbox" checked={isMean} onClick={() => this.setState({isMean: !isMean})} />
                        <label>Elakt</label>
                    </div>
                </body>
            </div>
        );
    }
}

export default App;
