import React from 'react'
import './App.css'
import Draggable from 'react-draggable'

var MyNote = React.createClass({
	//It is going to be called once and It will set the default for a state.
	getInitialState(){
		return {
				editing: false, 
				colorClass: "note"
			   }
	}, 

	// It is called right before the render, It is the last chance to effect state before rendering.
	componentWillMount(){
		// Define the position (style) of the new Note. This position is gona be a random position each time.
		this.style = {
			right: this.randomBetween(50, window.innerWidth - 250, 'px'), 
			left: this.randomBetween(50, window.innerWidth - 250, 'px'), 
			top: this.randomBetween(50, window.innerHeight -250, 'px'),
			bottom: this.randomBetween(50, window.innerHeight -250, 'px')
		} 		
	},

	// Random function to get a random position.
	randomBetween(x, y, s){
		return (x + Math.ceil(Math.random() * (y-x))) + s
	},

	// It is invoked immediately after a component is mounted.
	componentDidUpdate(){
		if(this.state.editing){
			// Puts the focus in the next text when editing.
			this.refs.myNewText.focus(); 
			this.refs.myNewText.select();
		}
	},

	// It is invoked before rendering when new props or state are being received. 
	shouldComponentUpdate(nextProps, nextState){
		return this.props.children !== nextProps.children || this.state !== nextState
	},

	// Edits the current Note. Sets the editing status to true. 
	edit(){
		this.setState({editing: true})
	},

	// Saves the changes in the current Note. Sets the editing status to false.
	save(){
		this.props.onChange(this.props.id, this.refs.myNewText.value)
		this.setState({editing: false})
	}, 

	// Sets color class by color value.
	setColorClass(value){	
		this.setState({ colorClass: value });		
	},
	
	// Removes the current Note. Sets the editing status to false.
	remove(){
		this.props.onRemove(this.props.id)
		this.setState({editing: false})
	},
	
	renderForm(){
		return (
			<div className={this.state.colorClass} style={this.style}>
				<span>
					<button className="leftNote" onClick={this.save}>Save</button> 
				</span>
				<textarea ref="myNewText" defaultValue={this.props.children}></textarea>
			</div>
		)
	}, 

	renderDisplay(){
		return (
			<div className={this.state.colorClass} style={this.style}> 
				<span className="optionsTop">
					<button className="leftNote" onClick={this.edit}>Edit</button>
					<button className="rightNote" onClick={this.remove}>Remove</button> 					
				</span>
				<p>{this.props.children}</p>
				<span className="optionsBottom">
					<button className="yellow" onClick={this.setColorClass.bind(this, 'note note-yellow')}></button>
					<button className="green" onClick={this.setColorClass.bind(this, 'note note-green')}></button> 
					<button className="blue" onClick={this.setColorClass.bind(this, 'note note-blue')}></button> 
					<button className="purple" onClick={this.setColorClass.bind(this, 'note note-purple')}></button>
					<button className="pink" onClick={this.setColorClass.bind(this, 'note note-pink')}></button>
					<button className="white" onClick={this.setColorClass.bind(this, 'note note-white')}></button>					
				</span>
			</div>  
			
		)
	},

	// Renders the view. It is the only required method.
	// This function will not be invoked if shouldComponentUpdate() returns false.
	render() {
		return (
				<Draggable>
				   {( this.state.editing) ? this.renderForm() 
										: this.renderDisplay() }
				</Draggable>)
	}
})

export default MyNote;