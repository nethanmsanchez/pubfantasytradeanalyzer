// playerView.js
// FantasyTradeAnalyzer
// Nethan S
// This file contains the PlayerView component code. It displays a player in a uniform row.

import React, { Component } from "react";
import "../css/styles.css";



class PlayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
        };
    }

    render(){
        return (
            <div className="player">
                <div className="space1"></div>
                <div className="bye">{this.props.player.bye}</div>
                <div className="space1"></div>
                <div className="pos">{this.props.player.position}</div>
                <div className="space1"></div>
                <div className="name">{this.props.player.name}</div>
                <div className="space1"></div>
                <div className="team">{this.props.player.team}</div>
                <div className="space1"></div>
                <div className="points">{this.props.player.projected_points}</div>
                <div className="space1"></div>
            </div>
        )
    }
}

export default PlayerView;