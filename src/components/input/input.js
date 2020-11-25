import React, { Component } from 'react';

import './input.css';


export default class Input extends Component{
    constructor(props){
        super(props)
        this.state = {
            isValid: false,
            operator: null,
            checkIcon: ' - '
        }
        this.inputRef = React.createRef();
        this.nextInputRef = React.createRef();
        this.validation = this.validation.bind(this);
        this.nextValidation = this.nextValidation.bind(this);
    }

    componentDidMount(){
       this.inputRef.current.focus()
    }

    validation(e){
        const code = e.target.value.replace(/[^\d]/g, '').slice(0, 2);
        if (code.length === 2) {
            console.log(`Operator code is ${code}`)
            let res;
            if([67, 68, 96, 97, 98].find((num) => num === +code)){res = 'Kyivstar'}
            else if([50, 66, 95, 99].find((num) => num === +code)){res = 'Vodafone'}
            else if([63, 73, 93].find((num) => num === +code)){res = 'Lifecell'}
            else if(+code === 91){res = '3mob'}
            else if(+code === 92){res = 'People.net'}
            else if([89, 94].find((num) => num === +code)){res = 'intertelecom'}
            else {res = 'Unknown'}
            
            this.setState({isValid: !this.state.isValid,
                           operator: res
                        })
            }
    }

    nextValidation(e){
        const code = e.target.value.replace(/[^\d]/g, '').slice(0, 7);
        if (this.state.isValid === true && code.length === 7) {
            console.log(`The user number is ${code}`)
            this.setState({checkIcon: ' ✔️ '})
        } 
    }

    componentDidUpdate() {
        this.nextInputRef.current.focus()
    }

     render(){
        return <div>
            <span className="operator-name">{this.state.operator}</span>
            <span>+38 0</span>
            <input 
                type="text" 
                className="operator-input"
                ref={this.inputRef}
                onInput={this.validation}
                />
            <span className="check-icon">{this.state.checkIcon}</span>
            <input type="text" 
                className="phone-input"
                ref={this.nextInputRef}
                onInput={this.nextValidation}
                 />
        </div>;
    }
}