import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Modal from '../Modal/Modal';
import serverIP from '../serverIP';
import './userguide.css';

export default class UserGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
    }
    //<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>
    /*
                
                
                
    */
    render () {
        return (
            <div class="guide">
                <div class = "header">
                    <h1>Frame Data Guide</h1>
                </div>
                <div class="guideContainer">
                    
                    <div class = "frame">
                        <h1 >What is a frame?</h1>
                        <img src ="https://raw.githubusercontent.com/UB-CSE/course-project-a4-project-frame/MuhtasimMaruf-Phase4-FrameDataGuide/src/Ultimate%20Fighting%20Game%20Guide/Gogeta.png" />
                        <p >A frame in a fighting game refers to a frame of animation in a fighting game. The static picture above would represent one frame for a move. </p>
                    </div>
                    <div class = "frame-data">
                        <h1> What is frame data?</h1>
                        <p>Understanding frame data is important in getting better at a fighting game. Frame data is information pertaining to a character's move. Understanding frame data will help you better understand why things work to your advantage or disadvatange.
                        </p>
                    </div>
                    <div class = "frame-data-steps">
                        <h1>Move Anatomy</h1>
                        <img src="https://github.com/UB-CSE/course-project-a4-project-frame/blob/MuhtasimMaruf-Phase4-FrameDataGuide/src/Ultimate%20Fighting%20Game%20Guide/Dhalsim.gif?raw=true" />
                        <p>A move for a character is divided into three frames. These are startup, active, and recovery frames. </p> 
                    </div>
                    <div class = "startup">
                        <h1> Startup</h1>
                        <img class = "fiveLstart" src = "https://github.com/UB-CSE/course-project-a4-project-frame/blob/MuhtasimMaruf-Phase4-FrameDataGuide/src/Ultimate%20Fighting%20Game%20Guide/5LStartup.PNG?raw=true"/>
                        <p> When you press a button to activate a move. your character will start that move. This startup frame phase starts the move but then transitions to active frames when the frames can interact with the opponent. This is important since knowing which moves have longer or shorter startup frames can let you know if the move is fast or slow. </p>
                    </div>
                    <div class = "activeAttack">
                        <h1> Active </h1>
                        <img class = "fiveL" src = "https://github.com/UB-CSE/course-project-a4-project-frame/blob/MuhtasimMaruf-Phase4-FrameDataGuide/src/Ultimate%20Fighting%20Game%20Guide/5L.png?raw=true"/>
                        <p> The active phase of a move is the period of time in which the move is able to hit your opponent. We saw in the startup section the start of Mystic Gohan's light attack. However, in the image above, we see the hit sparks land on Frieza indicating the move is in it's active frames. </p>
                    </div>
                    <div class = "recovery">
                        <h1> Recovery </h1>
                        <img class="DBFZGohan" src="https://github.com/UB-CSE/course-project-a4-project-frame/blob/MuhtasimMaruf-Phase4-FrameDataGuide/src/Ultimate%20Fighting%20Game%20Guide/DBFZ_AdultGohan_5L.png?raw=true"/>
                        <p> The recovery phase of a move happens directly after the active frames. During this time, as the name states they are recovering from the move. This is generally the time when your character is at its most vulnerable. On the left image, we see the startup for Gohan, and on the right is the phase where he is recovering. So, in the second image, Gohan is vulnerable after using his light attack. Therefore, moves with long recovery frames should be used carefully.</p>
                        <div class = "frame-advantage">
                            <h1> Frame Advantage </h1>
                            <p>When your attack connects with your opponent, it takes time for you to recover from your move, and time for the opponent to recover from blocking frames.  The difference in the time it takes for you to recover from your attack and the time it takes for your opponent to recover from block frames is called frame advantage. The more frame advantage you have, the easier it is for you to get started on your next attack's startup</p>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}