import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import MuteIcon from '@material-ui/icons/VolumeMute';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import RadioIcon from '@material-ui/icons/Radio';
import red from '@material-ui/core/colors/red';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import Player from '../../../components/player';
import blue from '@material-ui/core/colors/blue';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { fromJS } from 'immutable';
import _ from 'lodash';
import Slider from '@material-ui/lab/Slider';
import { palette, spacing, typography } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`${palette}${spacing}${typography}`;


const styles = theme => ({
  colorSwitchBase: {
    color: theme.palette.grey[300],
    '&$colorChecked': {
      color: theme.palette.grey[500],
      '& + $colorBar': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
    color:"silver",
    alignSelf: "flex-start",
    width:16,
    height:16
  },
});

class StationsPage extends React.Component {    

  constructor(props){
    super(props);
  }

  nextClick(id){     
    if (this.props.id === id){            
      this.props.process({propertyNames:["player", "playing"], payload: !this.props.player.playing});
    }
    else if (id < this.props.stations.length && id >= 0) {
      let elm  = this.props.stations.filter(elm=> elm.id ===id)[0];         
      this.props.process({propertyNames:["player"], payload: fromJS({...elm,  playing:true, volume:this.props.player.volume})});
    }
    else {      
      this.props.process({propertyNames:["player"], payload: fromJS({...this.props.stations[0],  playing:true, volume: this.props.player.volume})});
    }
  }  

  prevClick(id){    
    if (this.props.id === id){            
      this.props.process({propertyNames:["player", "playing"], payload: !this.props.player.playing});
    }
    else if (id < this.props.stations.length && id >= 0) {
      let elm  = this.props.stations.filter(elm=> elm.id ===id)[0];         
      this.props.process({propertyNames:["player"], payload: fromJS({...elm,  playing:true, volume:this.props.player.volume})});
    }
    else {      
      this.props.process({propertyNames:["player"], payload: fromJS({...this.props.stations[0],  playing:true, volume: this.props.player.volume})});
    }
  }  

  playPause(id){    
    if (this.props.id === id){            
      this.props.process({propertyNames:["player", "playing"], payload: !this.props.player.playing});
    }
    else if (id < this.props.stations.length && id >= 0) {
      let elm  = this.props.stations.filter(elm=> elm.id ===id)[0];         
      this.props.process({propertyNames:["player"], payload: fromJS({...elm,  playing:true, volume:this.props.player.volume})});
    }
    else {      
      this.props.process({propertyNames:["player"], payload: fromJS({...this.props.stations[0],  playing:true, volume: this.props.player.volume})});
    }
  }  

  changeTagFilter(tag){
    let tagFound = this.props.selectedTags.filter(tagInside => tagInside === tag)

    if (tagFound.length > 0){
      let newSelectedTags = this.props.selectedTags.filter(tagInside => tagInside !== tag)

      this.props.process({propertyNames:["selectedTags"], payload:fromJS(newSelectedTags)})
    }
    else {
      this.props.selectedTags.push(tag)
      this.props.process({propertyNames:["selectedTags"], payload:fromJS(this.props.selectedTags)})
    }    
  }

  changeVolume(event, value){
    this.props.process({propertyNames:["player", "volume"], payload: (value/100)})    
  }

  render() {

    const { classes } = this.props;

    let classesInner = {
      card: {
        display: 'flex',
      },
      card2: {
        display: 'flex',
        maxWidth: 150,
        width:150,
        maxHeight:150
      },
      cardActive: {
        display: 'flex',
        maxWidth: 150,
        width:150,
        maxHeight:150,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'       
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
        padding:10,
        margin:20,        
      },
      cover: {
        width: 50,
        height:50
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        alignContents: 'center'               
      },
      playIcon: {
        height: 65,
        width: 65,
      },
      muteIcon: {
        height: 65,
        width: 65
        
      },    
      bigAvatar: {
        margin: 5,
        width: 90,
        height: 90,
        objectFit: 'cover'
      },
      chipWrapper: {
        padding:5,
        margin:5
      },
      slider: {
        margin: 10,        
        padding:10
      }    
    }
    
    let spacing = 16;

    let theme={
      direction: ""
    }

    let elm;
    if (this.props.id !== -1){
      elm = this.props.stations.filter(elm=> elm.id === this.props.id)[0]      
    }    
    else  {
      elm = this.props.player
    }
 

    return (
      <Grid container style={classesInner.root} spacing={16}>
        <Grid item xs={12}>                                     
                <Card style={classesInner.card}>
                  <div style={classesInner.details}>
                    <CardContent style={classesInner.content}>
                      <Typography component="h5" variant="h5">
                        {/* {elm.name} */}
                      </Typography>                     
                      <Slider
                        classes={{ container: classesInner.slider }}
                        value={this.props.player.volume*100}
                        aria-labelledby="label"
                        onChange={(event, val)=>this.changeVolume(event, val)}
                      />
                    </CardContent>
                    <div style={classesInner.controls}>
                      <IconButton aria-label="Previous" onClick={()=>this.prevClick(elm.id-1)}>
                        {theme.direction === 'rtl' ? <SkipNextIcon style={classesInner.playIcon}  color="action"/> : <SkipPreviousIcon style={classesInner.playIcon}  color="action"/>}
                      </IconButton>
                     {
                        !this.props.player.playing && 
                        (<IconButton aria-label="Play/pause" onClick={()=>this.playPause(elm.id)}>
                        <PlayArrowIcon style={classesInner.playIcon} color="primary"/>
                      </IconButton>)
                     }
                     {
                        this.props.player.playing && 
                        (<IconButton aria-label="Play/pause" onClick={()=>this.playPause(elm.id)}>
                        <PauseIcon style={classesInner.playIcon} color="primary"/>
                      </IconButton>)
                     }                  
                      <IconButton aria-label="Next" onClick={()=>this.nextClick(elm.id+1)}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon style={classesInner.playIcon}  color="action"/> : <SkipNextIcon style={classesInner.playIcon}  color="action"/>}
                      </IconButton>
                      {
                        !this.props.player.muted && 
                        this.props.player.volume > 0.4 && 
                        (<IconButton aria-label="Mute" onClick={()=>this.props.process({propertyNames:["player", "muted"], payload: !this.props.player.muted})}>
                        <VolumeUpIcon style={[classesInner.muteIcon]} color="action" style={{ fontSize: 36 }}/>
                      </IconButton>)
                     }
                     {
                        !this.props.player.muted && 
                        this.props.player.volume <= 0.4 && 
                        (<IconButton aria-label="Mute" onClick={()=>this.props.process({propertyNames:["player", "muted"], payload: !this.props.player.muted})}>
                        <VolumeDownIcon style={[classesInner.muteIcon]} color="action"  style={{ fontSize: 36 }}/>
                      </IconButton>)
                     }
                     {
                        this.props.player.muted && 
                        (<IconButton aria-label="Mute" onClick={()=>this.props.process({propertyNames:["player", "muted"], payload: !this.props.player.muted})}>
                        <MuteIcon style={[classesInner.muteIcon]} color="error"  style={{ fontSize: 36 }}/>
                      </IconButton>)
                     }
                     {                       
                       _.includes(this.props.player.tags, "Video") &&
                       (
                        <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.props.player.audioOnly}
                              onChange={()=>this.props.process({propertyNames:["player", "audioOnly"], payload: !this.props.player.audioOnly})}
                              value={this.props.player.audioOnly}
                              classes={{
                                switchBase: classes.colorSwitchBase,
                                checked: classes.colorChecked,
                                bar: classes.colorBar,
                              }}
                            />
                          }
                          label="Radyo Modu"
                        />                       
                      </FormGroup>    )                  
                     }                                                                                              
                    </div>
                                        
                   <Player hiden={true} player={this.props.player}/>                                     
                   <Grid item style={classesInner.chipWrapper}>
                   {this.props.allTags.map(tag =>{
                     let that = this;
                     if (this.props.selectedTags.filter(tagInside => tagInside === tag).length > 0){
                      return (
                        <Chip
                        label={tag}
                        color={"primary"}                                           
                        avatar={"none"}
                        icon={"none"}
                        variant={"default"}                      
                        onClick={()=>this.changeTagFilter(tag)}
                      />
                       )
                     }
                     
                     return (
                      <Chip
                      label={tag}
                      color={"default"}                                           
                      avatar={"none"}
                      icon={"none"}
                      variant={"outlined"}                      
                      onClick={()=>this.changeTagFilter(tag)}
                    />
                     )
                   })   
                  }                
                  </Grid>                   
                  </div>                 
                </Card>                            
        </Grid>        
        <Grid container className={classesInner.demo} justify="center" spacing={spacing}>
            {this.props.stations.filter(elm => _.intersection(elm.tags, this.props.selectedTags).length == this.props.selectedTags.length).map(elm => (
              <Grid key={elm.id} item>                                                
                <Paper style={this.props.id !==elm.id ? classesInner.card2 : classesInner.cardActive} onClick={()=>this.playPause(elm.id)}>
                    <Avatar alt={elm.name} src={elm.img} style={classesInner.bigAvatar} classes={{img:"avatarimg"}}/>                                                         
                    <Grid style={{height:120, width:50, flexDirection:"column", alignSelf:"flex-start", alignContent:"flex-start"}}>
                      <FavoriteBorderIcon className={classes.iconHover}/>
                      <Typography inline variant="subtitle2" 
                        style={this.props.id !==elm.id ? {fontWeight:"light", color:"silver", fontSize:11, alignSelf:"flex-end"} 
                            : {fontWeight:"bold", color:"black", fontSize:11, alignSelf:"flex-end"}} >
                        {
                          elm.tags.map( tag =>{
                            return tag + " "
                          })
                        }
                      </Typography>
                    </Grid>
                    </Paper>                             
              </Grid>
            ))}
          </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    id: state.global.player.toJS().id,
    type: state.global.player.toJS().type,
    src: state.global.player.toJS().src,
    playing: state.global.player.toJS().playing,    
    global: state.global,
    player:state.global.player.toJS(),
    stations:state.global.stations.toJS(),
    selectedTags: state.global.selectedTags.toJS(),
    allTags: state.global.allTags.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {    
    process: ({ propertyNames, payload }) => dispatch({ type: "process", propertyNames, payload }),
  };
}

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StationsPage));
