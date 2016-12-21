import React from 'react'
import './App.css'
import MyNote from './MyNote'

var MyBoard = React.createClass({
		// Validates the types to make sure the data you receive is valid.
		propTypes: {
			count: function(props, propName){
				// Display an error message when the type is not a number.
				if(typeof props[propName] !== "number"){
					return new Error("Error: the Count field should be a number.")
				} 

				// Display an error message when the number of the Notes is more than 100.
				if(props[propName] > 100){
					return new Error('Error: it´s not possible to create ' + props[propName] + ' notes.' )
				} 
			}
		},
		
		// Empty default values for Notes.
		getInitialState(){
			return {
					notes: []
			}
		}, 

		// Gets the next id.
		nextId(){
			this.uniqueId = this.uniqueId || 0
			return this.uniqueId++
		}, 
		
		// It is called right before the render, It is the last chance to effect state before rendering.
		componentWillMount() {

			// Gets the default count, that is the number of notes creating by default.
			if (this.props.count) {
				var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
				fetch(url)
					.then(results => results.json())
					.then(array => array[0])
					.then(text => text.split('. '))
					.then(array => array.forEach(
							sentence => this.add(sentence)))
					.catch(function(err) {
						console.log("Error: we can´t connect to the API", err)
					})
			}
		},

		// Adds a new note.
		add(text){
			var notes = [
				...this.state.notes, 
				{
					id: this.nextId(), 
					note: text
				}
			]

			// Sets the state of the new notes list.
			this.setState({notes})
		},
	
		// Updates the note by id and the new text.
		update(id, newText){
			var notes = this.state.notes.map(
				note => (note.id !== id) ? 
					note : 
					{
						...note, 
						note: newText
					}
				)

			// Sets the state of the new notes list.
			this.setState({notes})
		}, 

		// Removes the note by Id.
		remove(id){
			// Gets all of the notes except the removed note. 
			var notes = this.state.notes.filter(note => note.id !== id)

			// Sets the state of the new notes list.
			this.setState({notes})
		}, 

		eachNote(note){
			// Defines the Note structure.
			return <MyNote key={note.id} 
						id={note.id} 
						onChange={this.update}
						onRemove={this.remove}>
						{note.note}
					</MyNote>
		}, 

		// Renders the view. It is the only required method.
		render(){
			return( 
				<div className="board">
					<button onClick={() => this.add('My new note')}>
					Click me <br/> to add a new Note</button>
					{
						this.state.notes.map(this.eachNote)
					}
				</div>
			)
		}
	}) 

export default MyBoard;
