    var ToDoBanner = React.createClass({
		render: function(){
			return ( 
			 <h3>TODO....react.js</h3>
			);
		}
	});
	
	var TodoList = React.createClass({
		render: function() {
      var createItem = function(itemText, i) {
        return (
            <TodoListItem key={i}>{itemText}</TodoListItem>
          );
      };
      return <ul>{this.props.items.map(createItem, this)}</ul>;
      }
    });
	
	var TodoListItem = React.createClass({
      render: function(){
        return (
          <li data-id={this.props.value} 
					key={this.props.value}>{this.props.children}</li>
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
			return {items:['Todo itme #1','Todo item #2']};
		},
		updateItems: function(newItem){
		
			var allItems = this.state.items.concat([newItem]);
			this.setState({
				items: allItems
			});
		},
		render: function(){
			return (
				<div>
					<ToDoBanner/>
					<TodoForm onFormSubmit={this.updateItems}/>
					<TodoList items={this.state.items} />
				</div>
			);
		}
	});
	 ReactDOM.render(
        <TodoApp/>,
        document.getElementById('todo')
      );
	