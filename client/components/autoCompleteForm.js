// autoCompleteForm.js
// FantasyTradeAnalyzer
// Nethan S
// This file contains the AutoCompleteForm component code. It is large component that holds the code to
// create the teams that will be compared. 

import React from "react";
import axios from 'axios';
import "../css/styles.css";
import PlayerView from "./playerView";
const path = require('path');



class AutoCompleteForm extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                input: "",
                all_names: [],
                filtered_names: [],
                index: this.props.index,
                show_autocomplete: false,
                team: [],
                team_name: this.props.team_name,
                total: 0,
                valid_name: "",
                popup_text: "",
            }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.sendPopUp = this.sendPopUp.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
    }


    // ----------------- event handlers ---------------------
    // This event is called anytime there is a change in the user input in the search bar.
    handleChange(e){
        // Loop through all names and build array of names that contain currently entered substring.
        let temp = [];
        let counter = 0;
        let show = false;
        let valid_name = "";
        for(let i = 0; i < this.state.all_names.length; i++){
            if(this.state.all_names[i].toLowerCase().includes(e.target.value.toLowerCase())){
                if(this.state.all_names[i].toLowerCase() == e.target.value.toLowerCase()){
                    valid_name = this.state.all_names[i];
                } else {
                    valid_name = "";
                }
                temp[counter] = this.state.all_names[i];
                counter++;
            }
        }

        // Check if we should show autocomplete ui or not.
        if(temp.length > 0 && (e.target.value.toLowerCase() != "")){
            show = true;
        } else {
            show = false
        }
        
        // Update state
        this.setState({
            input: e.target.value,
            filtered_names: temp,
            show_autocomplete: show,
            valid_name: valid_name,
        })
    }

    // This event is called when the user clicks the add button. (for some reason I didn't try creating the
    // whole thing as async but tried it for update team and it works so this can be cleaned up at some point)
    async handleAdd(e){
        e.preventDefault();
        let data = null;
        let tester = this.checkValidity(this.state.input);
        if ( tester != "" ){
            this.props.showPopUp(tester);
            this.setState({
                input: "",
                show_autocomplete: false,
            })
            return;
        }

        // This is a small helper function, originally created to make async for await functionality
        async function getPlayer(state_name){
            await axios.get(path.join(__dirname, "/record"), {
                params: state_name
            }).then( (res) => {
                data = res.data;
            }).catch( (error) => {
                console.log(error);
            });
            return data
        }

        let ans = "";
        if(this.state.valid_name == "") {
            ans = getPlayer(this.state.input);
        } else {
            ans = getPlayer(this.state.valid_name);
        }
        await ans.then( (resolve) => {
            this.updateTeam(resolve);
        })
        this.updateTotal();
        this.setState({
            input: "",
            show_autocomplete: false,
        })
    }
    
    // This event is called when the user clicks one of the autocomplete suggestions.
    handleClick(e){
        e.preventDefault();
        this.setState({
            input: e.currentTarget.innerText,
            filtered_names: [],
            show_autocomplete: false,
        })
    }

    // This event is called when one of the delete buttons is clicked for a player.
    async handleDel(e){
        e.preventDefault();
        let index = e.target.id;
        let temp = this.state.team;
        temp.splice(index, 1);
        await this.setState({
            team: temp,
        })
        this.updateTotal();
    }

    // This event is called twice, when adding a player, and when deleting a player.
    async updateTotal(){
        let total = 0;
        for(let i = 0; i < this.state.team.length; i++){
            let num = parseFloat(this.state.team[i].projected_points);
            total = total + num;
        }
        this.props.onTeamChange(total, this.props.index, this.state.team);
    }

    // This function will be called when sending the pop up back to mainPage.
    async sendPopUp(text){
        this.props.showPopUp(text);
    }

    // ------------- component lifecycle methods -------------
    // When the component is created (mounted) get all names from the db for suggestions
    async componentDidMount(){
        await axios.get(path.join(__dirname, "/names")).then( (res) => {
            console.log(res.data.names.length);
            this.setState({
                all_names: res.data.names
            })
        }).catch( (error) => {
            console.log(error);
        });
    }
    // -------------------------------------------------------

    // ---------------- Helper Methods -----------------------
    // This method is called when a player is being added by the handleAdd() function.
    updateTeam(player){
        let ans = [];   
        this.state.team.map( (item, index) => {
            ans[index]  = item;
        })
        ans[ans.length] = player;
        this.setState({
            team: ans,
        })
        return ans;
    }

    // This method is called when trying to add a player to make sure the input is valid.
    checkValidity(text){
        let valid = false;
        let temp = "invalid input: no player found."
        for(let i = 0; i < this.state.all_names.length; i++){
            if(this.state.all_names[i].toLowerCase() == text.toLowerCase()){
                valid = true;
                temp = "";
            }
        }
        for (let i = 0; i < this.state.team.length; i++) {
            if (this.state.team[i].name.toLowerCase() == text.toLowerCase()) {
                valid = false;
                temp = "invalid input duplicate on same team";
            }
        }
        for (let i = 0; i < this.props.other_team.length; i++){
            if (text.toLowerCase() == this.props.other_team[i].name.toLowerCase()){
                valid = false;
                temp = "invalid input duplicate on other team";
            }
        }
        if(valid){
            temp = "";
        }
        this.setState({
            popup_text: temp,
        })
        return temp;
    }

    render(){
        let team = null;
        let key = null;
        if( this.state.team.length === 0){
            key = null;
            team = null;
        } else {
            team = this.state.team.map( (item, index) =>
                <div className="row">
                    <button className="del" id={index} onClick={this.handleDel}>Del</button>
                    <PlayerView player={item}/>
                </div>
            )
            key = 
                <div className="key">
                    <div className="spacer"></div>
                    <div className="player">
                        <div className="space1"></div>
                        <div className="bye test">Bye:</div>
                        <div className="space1"></div>
                        <div className="pos test">Pos:</div>
                        <div className="space1"></div>
                        <div className="name test">Name:</div>
                        <div className="space1"></div>
                        <div className="team test">Team:</div>
                        <div className="space1"></div>
                        <div className="points test">Points:</div>
                        <div className="space1"></div>
                    </div>
                </div>
        }

        let suggestions = null;
        if(this.state.show_autocomplete == true) suggestions = this.state.filtered_names.map( (item, index) =>
            <p className="suggestion_entry" id={index} onClick={this.handleClick}>{item}</p>
        )

        return (
            <div className="autocomplete">
                <h1 className="teamname">Team {this.state.team_name}</h1>   
                <form className="form" onSubmit={this.handleAdd}>
                    <label className="label">
                        <input className="textbox" type="text" value={this.state.input} onChange={this.handleChange} />
                        <input className="add" type="submit" value="Add" name="submit_button" />
                    </label>        
                </form>
                <div className="suggestions">{suggestions}</div>
                {key}
                {team}
            </div>
        )
    }

}

export default AutoCompleteForm;