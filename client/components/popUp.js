// popUp.js
// FantasyTradeAnalyzer
// Nethan S
// This file contains the code for the PopUp component.

import React from "react";
import "../css/styles.css";

class PopUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: this.props.message,
            visible: this.props.visible,
        }
        this.handleClose = this.handleClose.bind(this);
    }

    // This method is called when the pop up is closed to reset to the defaults.
    async handleClose(){
        await this.setState({
            visible: false,
            message: "",
        })
    }

    // This method checks if the popup was called before.
    componentDidUpdate(prevProps) {
        if (this.props.visible != prevProps.visible) {
            this.setState({
                message: this.props.message,
                visible: true,
            })
        }
    } 

    render() {
        const outer = {
            border: "7px solid rgb(10, 66, 118)",
            textAlign: "center",
            width: "50%",
            height: "15%",
            margin: "auto",
            position: "fixed",
            left: "25%",
            bottom:"42%",
            backgroundColor: "aliceblue",
            color: "rgb(10, 66, 118)",
        }
        const close = {
            width: "8%",
            height: "30%",
            margin: "auto",
            padding: "0px",
            position: "absolute",
            right: "0%",
            top: "0%",
            textAlign: "center",
        }
        const text = {
            padding: "15px 0px 0px 0px",
        }
        let output = null;
        if(this.state.visible) {
            output = 
                <div style={outer}>
                    <h2 style={text}>{this.state.message}</h2>
                    <button style={close} onClick={this.handleClose}>Close</button>
                </div>
            } else {
                output = null;
            }
        return (
            output
        )
    }
}

export default PopUp;