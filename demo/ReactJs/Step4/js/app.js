    var ToDoBanner = React.createClass({
		render: function(){
			return ( 
			 <h3>TODO....react.js</h3>
			);
		}
	});
	
	var ToDoList = React.createClass({
		Remove: function(e){
		   this.props.onDelete(e);
		},
		render: function() {
			
			var createItem = function(itemText,i) {
			
				return (
					<ToDoListItem key={i} value={i} onRemove = {this.Remove}>{itemText}</ToDoListItem>
				);
			};
			var allitems = this.props.items;
            // Here is the filter function 
			var status = this.props.filter[0].Status;
			switch (status){
				case 'false':
				 allitems = allitems.filter(t => !t.isDone)
				 break;
				 case 'true':
				 allitems = allitems.filter(t => t.isDone)
			};
			
			var queryText = this.props.filter[0].keyword;
		 
			if(queryText){
				var queryResult=[];
				allitems.forEach(function(item){
					if(item.item.toLowerCase().indexOf(queryText)!=-1)
					queryResult.push(item);
				});
				return <ul>{queryResult.map(createItem,this)}</ul>;
			}
	
			return <ul>{allitems.map(createItem,this)}</ul>;
		}
    });
	
	var ToDoListItem = React.createClass({
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
	
	var ToDoForm = React.createClass({
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

	var ToDoFilter = React.createClass({
		isActive:function(value){
			return 'btn '+((value===this.props.filter[0].Status) ?'btn-primary':'default');
		},
		render: function(){
            var onFilter1 = this.props.onFilter;
            var onSearch1 = this.props.onSearch;
		    return(
                    <div className="row">
						<div className="col-xs-7">
							<div id="todo-filter" className="input-group">
								<span className="input-group-btn">
									<button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search"></span></button>
									</span>
									<input  type="search" className="form-control" ref='filter' onChange={onSearch1} placeholder="Search" ></input>
							</div>
						</div>
						<div className="col-xs-5">
							<ul className="nav nav-pills todo-filter">
								<li><a onClick={onFilter1} className={this.isActive('SHOW_ALL')} value="SHOW_ALL" href="#">All</a></li>
								<li><a onClick={onFilter1} className={this.isActive('false')} value="false">Incomplete</a></li>
								 <li><a onClick={onFilter1} className={this.isActive('true')} value="true">Complete</a></li>
							</ul>
						</div>
					</div>
            ); 
		}
	});
	
	var ToDoApp = React.createClass({
		getInitialState : function(){
			return {items:[{item:'Todo itme #1',isDone:false},{item:'Todo itme #2',isDone:true}],filter:[{keyword:'',Status:"SHOW_ALL"}]};
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
		filterItem : function(e){
			this.state.filter[0].Status = e.target.value;
			this.setState({
				filter: this.state.filter
			});
		},
		searchItem : function(e){
			this.state.filter[0].keyword = e.target.value;
			this.setState({
				filter: this.state.filter
			});
		},
		render: function(){
			return (
				<div>
					<ToDoBanner/>
					<ToDoFilter onFilter = {this.filterItem} onSearch = {this.searchItem} filter={this.state.filter}/>
					<ToDoForm onFormSubmit={this.updateItems} />
					<ToDoList items={this.state.items} filter = {this.state.filter}  onDelete={this.deleteItem} />
				</div>
			);
		}
	});
	 
	ReactDOM.render(
        <ToDoApp/>,
        document.getElementById('todo')
    );
	