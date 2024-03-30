import React, { Component } from 'react';
import "../css/Bmr.css"

class Bmr extends Component {
    constructor() {
        super();
        this.state = {
            gender: '',
            weight: '',
            age: '',
            heightfeet: '',
            heightinches: '',
            activity: '',
            bmr: '',
            error: '',
            flag: false,
            system: '1', // Default to metric system
        };
    }

    handleAgeChange = (event) => {
        this.setState({ age: event.target.value });
    }

    handleWeightChange = (event) => {
        this.setState({ weight: event.target.value });
    }

    handleHeightFeetChange = (event) => {
        this.setState({ heightfeet: event.target.value });
    }

    handleHeightInchesChange = (event) => {
        this.setState({ heightinches: event.target.value });
    }

    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }

    handleSystemChange = (event) => {
        this.setState({ system: event.target.value });
    }

    calculateBMR = () => {
        const { age, weight, heightfeet, heightinches, gender, system } = this.state;
    
        if (system === '1') {
            if (age === '' || weight === '' || gender === '' || heightfeet === '') {
                this.setState({ error: 'All fields are required' });
                return;
            }
        } else if (system === '2') {
            if (age === '' || weight === '' || gender === '' || heightfeet === '' || heightinches === '') {
                this.setState({ error: 'All fields are required' });
                return;
            }
        }
    
        let bmrCalc = 0;
        if (system === '1') {
            const height = heightfeet * 30.48;
            if (gender === '1') {
                bmrCalc = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
            } else if (gender === '2') {
                bmrCalc = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
            }
        } else if (system === '2') {
            const height = heightfeet * 12 + parseInt(heightinches);
            if (gender === '1') {
                bmrCalc = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            } else if (gender === '2') {
                bmrCalc = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age);
            }
        }
    
        this.setState({ bmr: bmrCalc });
        this.setState({ flag: true });
        this.setState({ error: '' });
    }

    render() {
        return (
            <div>
                <h1>BMR Calculator</h1>
                <form className="bmr-form">

                    <div className="form-group">
                        <label>Measurement System:</label>
                        <select value={this.state.system} onChange={this.handleSystemChange}>
                            <option value="1">Metric</option>
                            <option value="2">Imperial</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Gender:</label>
                        <select value={this.state.gender} onChange={this.handleGenderChange}>
                            <option value="">Select Gender</option>
                            <option value="1">Female</option>
                            <option value="2">Male</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Weight:</label>
                        <input type="number" value={this.state.weight} onChange={this.handleWeightChange} placeholder={this.state.system === '1' ? 'kg' : 'lbs'} />
                    </div>

                    <div className="form-group">
                        <label>Age:</label>
                        <input type="number" value={this.state.age} onChange={this.handleAgeChange} />
                    </div>

                    <div className="form-group">
                        <label>Height:</label>
                        {this.state.system === '1' ? (
                            <input type="number" value={this.state.heightfeet} onChange={this.handleHeightFeetChange} placeholder="cm" />
                        ) : (
                            <>
                                <input type="number" value={this.state.heightfeet} onChange={this.handleHeightFeetChange} className="feet-input" placeholder="Feet" />
                                <input type="number" value={this.state.heightinches} onChange={this.handleHeightInchesChange} className="inches-input" placeholder="Inches" />
                            </>
                        )}
                    </div>

                    <button type="button" onClick={this.calculateBMR}>Calculate BMR</button>
                    {this.state.bmr && (
                        <div className="answer-box">
                            BMR: {this.state.bmr}
                        </div>
                    )}
                    {this.state.error && <div className="error">{this.state.error}</div>}

                </form>

                <h5 className='explanation'>
                    BMR Definition: Your Basal Metabolic Rate (BMR) is the estimated number of calories you burn as your body performs basic functions. Exercising increases this number.
                </h5>

                {this.state.gender === '1' && (
                    <h5 className='explanation'>
                        For Women the formulas are:
                        <br/><br/>
                        Metric: BMR = 655.1 + ( 9.563 × weight in kg ) + ( 1.85 × height in cm ) − ( 4.676 × age in years )
                        <br/><br/>
                        Imperial: BMR = 655.1 + ( 4.35 × weight in pounds ) + ( 4.7 × height in inches ) − ( 4.7 × age in years )
                    </h5>
                )}

                {this.state.gender === '2' && (
                    <h5 className='explanation'>
                        For Men the formulas are:
                        <br/><br/>
                        Metric: BMR = 66.47 + ( 13.75 × weight in kg ) + ( 5.003 × height in cm ) − ( 6.755 × age in years )
                        <br/><br/>
                        Imperial: BMR = 66.47 + ( 6.24 × weight in pounds ) + ( 12.7 × height in inches ) − ( 6.755 × age in years )
                    </h5>
                )}

            </div>
        );
    }
}

export default Bmr;