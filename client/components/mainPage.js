// mainPage.js
// FantasyTradeAnalyzer
// Nethan S
// This is the largest component that contains basically all of the unique project code. It contains two
// AutoCompleteForm components, two totals, and a compare button or comparison results.

import React from "react";
import "../css/styles.css";
import AutoCompleteForm from "./autoCompleteForm";
import PopUp from "./popUp";



class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totals: [0, 0],
            teams: ["1", "2"],
            team_members: [[], []],
            total: -1,
            output: "",
            winner: -1,
            popup: false,
            message: "",
        }
        this.updateTotal = this.updateTotal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPopUp = this.showPopUp.bind(this);
    }

    // This function is used to update either of the team totals. It is passed into the ACF components and
    // returns the updated totals, team members, and resets the output and total for results
    async updateTotal(total, index, team){
        let temp = this.state.totals;
        let temp1 = this.state.team_members;
        if ( index == 0) {
            temp1 = [team, this.state.team_members[1]];
        } else {
            temp1 = [this.state.team_members[0], team];
        }
        temp[index] = total;
        await this.setState({
            totals: temp,
            winner: -1,
            output: "",
            total: -1,
            team_members: temp1,
        })
    }

    // This function is called when the compare button is pressed. It updates the total for results, output
    // message, and who is winning.
    handleSubmit(){
        let temp;
        let out;
        let winning = -1;
        if(this.state.totals[0] == null && this.state.totals[1] == null){
            temp = -1;
            out = "Oops it looks like two teams have not been entered";
        }
        if(this.state.totals[0] > this.state.totals[1]){
            temp = this.state.totals[0] - this.state.totals[1];
            out = "Team " + this.state.teams[0] + " has the advantage by " + temp.toFixed(1) + " points";
            winning = 0;
        } else if ( this.state.totals[0] < this.state.totals[1]){
            temp = this.state.totals[1] - this.state.totals[0];
            out = "Team " + this.state.teams[1] + " has the advantage by " + temp.toFixed(1) + " points";
            winning = 1;
        } else {
            temp = 0;
            out = "Teams are tied!";
        }
        this.setState({
            total: temp,
            output: out,
            winner: winning,
        })
    }

    // This function is passed into the PopUp component. It is used to tell mainPage to display the PopUp
    // and to set the text of the popup.
    async showPopUp(text) {      
        let temp = this.state.popup;
        await this.setState({
            popup: !temp,
            message: text,
        })
    }


    render(){
        let team0 = <AutoCompleteForm team_name={this.state.teams[0]} index={0} onTeamChange={this.updateTotal} 
            showPopUp={this.showPopUp} other_team={this.state.team_members[1]} />;
        let team1 = <AutoCompleteForm team_name={this.state.teams[1]} index={1} onTeamChange={this.updateTotal} 
            showPopUp={this.showPopUp} other_team={this.state.team_members[0]} />;
        let button1 = (<button onClick={this.handleSubmit}>Compare</button>);
        let bottom;

        if( this.state.total != -1){
            // This block is entered if compare button was clicked.
            bottom = <span className="compare_and_results_container"> <p className="results_text">{this.state.output}</p> </span>
        } else {
            bottom = <span> {button1} </span>
        }
        // Dynamically assign className's/css styles for winner/loser/default
        let ltotal_classname = "ltotals";
        let rtotal_classname = "rtotals";
        if ( this.state.winner == 0 ) {
            ltotal_classname += " winner";
            rtotal_classname += " loser";
        } else if ( this.state.winner == 1 ) {
            ltotal_classname += " loser";
            rtotal_classname += " winner";
        }
        
        return (
            <div className="mainpage">
                <div>
                    <h1 className="title">Fantasy Trade Analyzer</h1>
                    <div className="acf_inmp1"> {team0} </div>
                    <div className="space2"></div>
                    <div className={ltotal_classname}> {this.state.totals[0].toFixed(1)} </div>
                    <div className="space2"></div>
                    <div className="compare1"> {bottom} </div>
                    <div className="space2"></div>
                    <div className={rtotal_classname}> {this.state.totals[1].toFixed(1)} </div>
                    <div className="space2"></div>
                    <div className="acf_inmp2"> {team1} </div> 
                    <div className="compare2"> {bottom} </div>
                </div>
                <PopUp message={this.state.message} visible={this.state.popup} />
            </div>
        )
    }
}

export default MainPage;

