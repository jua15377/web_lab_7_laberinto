import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './style.css'


class Maze extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mazeContent: [],
		  isLoading: false,
		  error: null,
		  w: this.props.w,
			h: this.props.h,
			orientation: "player_down",
			winCondition:false
		  }
	  }

	  getMaze() {
		  const baseUrl = 'http://34.210.35.174:3001/'
		  const newUrl = `${baseUrl}?type=json&w=${this.state.w}&h=${this.state.h}`
		  return newUrl
  }

	  componentDidMount() {
		  this.setState({ isLoading: true })
		  const api = this.getMaze()
		  axios.get(api)
		    .then(result => this.setState({
			    mazeContent: result.data,
			    isLoading: false,
		    }))
		    .catch(error => this.setState({
			    error,
			    isLoading: false,
		     }))
		}
		handelMove(move, x, y) {
			let maze_content  = this.state.mazeContent
			let ori = this.state.orientation
			let wincon = this.state.winCondition
			console.log("args", move, x, y)

			// Change X and Y values
			if (move === "up") { //up key
				console.log("move up");
				if(y-1>0){
					if (maze_content[y-1][x] === "g"){
						wincon = true
					}
					if (maze_content[y-1][x] !== "-" && maze_content[y-1][x] !== "+" ){
						maze_content[y][x] = ""
						y--
						maze_content[y][x] = "p"
						ori = "player_up"
					}
				} 
			} 
			else if (move === "down") { //down key
				console.log("move down")
				if(y+1<8){
					if (maze_content[y+1][x] === "g"){
						wincon = true
					}
					if (maze_content[y+1][x] !== "-" && maze_content[y+1][x] !== "+" ){
						maze_content[y][x] = ""
						y++
						maze_content[y][x] = "p"
						ori = "player_down"
					}
				} 
			}
			else if (move === "left") { // left key
				console.log("move left")
				if(x-1>0){
					if (maze_content[y][x-1] === "g" ){
						wincon = true
					}
					if (maze_content[y][x-1] !== "|" && maze_content[y][x-1] !== "+" ){
						maze_content[y][x] = ""
						x--
						maze_content[y][x] = "p"
						ori = "player_left"
					}
				} 
			} 
			else if (move === "rigth") { // right key
				console.log("rigth")
				if(x+1<12){
					if (maze_content[y][x+1] === "g" ){
						wincon = true
					}
					if (maze_content[y][x+1] !== "|" && maze_content[y][x+1] !== "+" ){
						maze_content[y][x] = ""
						x++
						maze_content[y][x] = "p"
						ori = "player_rigth"
					}
				} 
			}
			console.log("wincondi", wincon )
			if(wincon){
				console.log("player_won")
				ori="player_won"
			}
			this.setState({
				mazeContent:maze_content,
				orientation:ori,
				winCondition:wincon
			})
	  }


  render() {
		// console.log(this.state.mazeContent)
		let messageWin = null
		if (this.state.winCondition==true){
			messageWin = <Message/>
		}
    return (
			<div className="index">
				{messageWin}
				<h1>Maze</h1>
				<div className="Maze_4" >
{
				this.state.mazeContent.map((elemnt, key) => {
				  return (
				    elemnt.map((piece, key2) => {
				      const iswall = false
				      if (piece === '+') {
				        return <div className="intersection" />
				      } if (piece === '|') {
				        return <div className="verticalWall" />
				      } if (piece === '-') {
				        return <div className="horizontalWall" />
				      } if (piece === 'p') {
				        return <Player x={key2} y={key} f={this.handelMove.bind(this)} ori={this.state.orientation}/>
				      } if (piece === 'g') {
				        return <div className="goal" />
				      }
				        return <div className="walk" />
				    }))
				})
			  }
    </div>
   </div>
    )
  }
}

class Player extends React.Component{
	constructor(props) {
		super(props)
		this.play = React.createRef();
    this.state = {
			x: this.props.x,
			y: this.props.y,
			orientation: this.props.ori
		  }
		}
		componentDidMount() {
			console.log("update")
			this.play.current.focus();
		}

		keyboardInput (e) {
			// console.log(e)
			let ori = this.state.orientation
			let code = e.keyCode ? e.keyCode : e.which;
			// Change X and Y values
			if (code === 38) { //up key
				console.log("up");
				this.props.f("up",this.state.x, this.state.y)
			} else if (code === 40) { //down key
				console.log("down")
				this.props.f("down",this.state.x, this.state.y)
			} 
			else if (code === 37) { // left key
				console.log("left")
				this.props.f("left",this.state.x, this.state.y)
			} 
			else if (code === 39) { // right key
				console.log("rigth")
				this.props.f("rigth",this.state.x, this.state.y)
			}
	}
	
	render() {
		return(
			<div className={this.state.orientation} onKeyDown={this.keyboardInput.bind(this)} tabIndex="0" ref={this.play} />
		)
	}
}

class Message extends React.Component{
	constructor(props) {
		super(props)
		this.state = {}
	}
	reloadGame(){
		location.reload();
	}
	render(){
		return (
			<div className={"completed"} onClick={()=>{this.reloadGame()}}>
			<h1>Maze completed!!</h1>
			<h2>click on any place and the page will be reloaded!</h2>
			</div>
			)
		}
	}


ReactDOM.render(<Maze w={4} h={4} />, document.getElementById('index'))
