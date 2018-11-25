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


  render() {
    // console.log(this.state.mazeContent)
    return (
			<div>
				<h1>HelloW</h1>
				<div className="Maze_4">
{
				this.state.mazeContent.map((elemnt, key) => {
				  { console.log('line', elemnt) }
				  return (
				    elemnt.map((piece, key2) => {
				      const iswall = false
				      { console.log('pieces', piece) }
				      if (piece === '+') {
				        return <div className="intersection" />
				      } if (piece === '|') {
				        return <div className="verticalWall" />
				      } if (piece === '-') {
				        return <div className="horizontalWall" />
				      } if (piece === 'p') {
				        return <Player x={key2} y={key}/>
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
    this.state = {
			x: this.props.x,
			y: this.props.y
		  }
		}
		keyboardInput (e) {
			console.log(e)
			let code = e.keyCode ? e.keyCode : e.which;
			// Change X and Y values
			if (code === 38) { //up key
					conosole.log("up");
			} else if (code === 40) { //down key
					conosole.log("down")
			} else if (code === 37) { // left key
					console.log("lef")
			} else if (code === 39) { // right key
				  console.log("rigth")
			}
	}
	
	render() {
		return(
			<div className="player_up" onKeyDown={this.keyboardInput} />
		)
	}
}

ReactDOM.render(<Maze w={4} h={4} />, document.getElementById('index'))
