import React from 'react'
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import _ from 'lodash'
class Player extends React.Component {    

    constructor(props){
        super(props);  
    }    

    render(){    
        if (_.includes(this.props.player.tags, "Video") && !this.props.player.audioOnly){
            return (
                <div style={{width:300, height:200}}>           
                   <ReactPlayer controls width='100%' height='100%' url={this.props.player.src} playing={this.props.player.playing} volume={this.props.player.volume} muted={this.props.player.muted}/>
                </div>
            )    
        } 

        return (
            <div hidden={true}>           
               <ReactPlayer width='100%' height='100%' url={this.props.player.src} playing={this.props.player.playing} volume={this.props.player.volume} muted={this.props.player.muted}/>
            </div>
        )        
    }
}

Player.propTypes = {
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

export default Player;