    var ToDoBanner = React.createClass({
		render: function(){
			return ( 
			 <h3>TODO....react.js</h3>
			);
		}
	});
	
	var TodoList = React.createClass({
		Remove: function(e){
		   this.props.onDelete(e);
		},
		render: function() {
			var createItem = function(itemText, i) {
			return (
					<TodoListItem key={i} value={i} onRemove = {this.Remove}>{itemText}</TodoListItem>
				  );
			  };
			return <ul>{this.props.items.map(createItem, this)}</ul>;
		}
    });
	
	var TodoListItem = React.createClass({
		changeHandler: function(e){
			this.setState({
			  value: e.target.checked
			});
			this.props.children.isDone = e.target.checked;
		},
		RemoveHandler: function(){
		   this.props.onRemove(this.props.value);
		},
		render: function(){
			var _style = "line-through";
			if(!this.props.children.isDone)
			_style ="none";
			return (
			  <li data-id={this.props.value} 
						key={this.props.value}><button type="button" className="close pull-right" aria-hidden="true" onClick={this.RemoveHandler}>&times;</button><input type="checkbox" onChange={this.changeHandler} defaultChecked={this.props.children.isDone} /><span style={{"textDecoration": _style}}>{this.props.children.item}</span></li>
			);
		}
    });
	
	var TodoForm = React.createClass({
		getInitialState: function() {
			return {item: ''};
        },
		handleSubmit: function(e){
			e.preventDefault();
			this.props.onFormSubmit(this.state.item);
			this.setState({item: ''});
			ReactDOM.findDOMNode(this.refs.item).focus();
			return;
		},
		onChange: function(e){
			this.setState({
			  item: e.target.value
			});
		},
		render: function(){
			return (
				<div className="row">
				  <form  onSubmit={this.handleSubmit}>
					<div className="form-group col-sm-10">
						<input type='text' className="todoField form-control"  ref='item' onChange={this.onChange} value={this.state.item}/>
						<input type='submit' className="btn btn-default" style={{"float":"left","marginLeft":"5px"}} value='Add'/>
					</div>
				  </form>
				</div>
			);
		}
    });		
	
	var TodoApp = React.createClass({
		getInitialState : function(){
			return {items:[{item:'Todo itme #1',isDone:false},{item:'Todo itme #2',isDone:true}]};
		},
		updateItems: function(newItem){
		
			var item = {item:newItem,isDone:false};
			var allItems = this.state.items.concat([item]);
			this.setState({
				items: allItems
			});
		},
		deleteItem : function(index){
			var newData = this.state.items.slice(); //copy array
			newData.splice(index, 1); //remove element
			this.setState({
				items: newData
			});
		},
		render: function(){
			return (
				<div>
					<ToDoBanner/>
					<TodoForm onFormSubmit={this.updateItems} />
					<TodoList items={this.state.items} onDelete={this.deleteItem} />
				</div>
			);
		}
	});
	 
	ReactDOM.render(
        <TodoApp/>,
        document.getElementById('todo')
    );
	