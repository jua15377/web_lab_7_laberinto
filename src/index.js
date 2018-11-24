import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import './style.css'

class Maze extends React.Component{

	constructor(props) {
		super(props);
	
		this.state = {
		  mazeContent: [],
		  isLoading: false,
		  error: null,
		  w: this.props.w,
		  h: this.props.h
		};
	  }
	  getMaze(){
		const baseUrl = 'http://34.210.35.174:3001/'
		let newUrl =  baseUrl + '?type=json&w='+ this.state.w +'&h=' + this.state.h
		return newUrl
	}
	
	  componentDidMount() {
		this.setState({ isLoading: true });
		let api = this.getMaze()
		axios.get(api)
		  .then(result => this.setState({
			mazeContent: result.data,
			isLoading: false
		  }))
		  .catch(error => this.setState({
			error,
			isLoading: false
		  }));
	  }	

	render(){
		console.log(this.state.mazeContent)
		return(
			<div>
				<h1>HelloW</h1>
				<div className="Maze_4">{
				this.state.mazeContent.map((elemnt)=>{
					{console.log("line",elemnt)}
					return(
					elemnt.map((piece)=>{
						let iswall = false
						{console.log("pieces",piece)}
						if(piece === "+"){
							return <div className="intersection"></div>
						}
						else if(piece === "|"){
							return <div className="verticalWall"></div>
						}
						else if(piece === "-"){
							return <div className="horizontalWall"></div>
						}
						else if(piece === "p"){
							return <div className="player_up"></div>
						}
						else if(piece === "g"){
							return <div className="goal"></div>
						}
						else{
							return <div className="walk"></div>
						}
					}))
				})
			}
			</div>
		</div>
		)
	}
	
}



ReactDOM.render( <Maze w={4} h={4}/>, document.getElementById('index'))