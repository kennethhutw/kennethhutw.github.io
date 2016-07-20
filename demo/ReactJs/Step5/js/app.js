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
			// Here is the search function 
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
	var ToDoCatalogForm = React.createClass({
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
					<div className="form-group ">
						<input type='text' className="newTodoCatalogField form-control"  ref='item' onChange={this.onChange} value={this.state.item}/>
						<input type='submit' className="btn btn-default" style={{"float":"left","marginLeft":"5px"}} value='Add'/>
					</div>
				  </form>
				  </div>
				
			);
		}
    });
	var ToDoCatelog  = React.createClass({
		changeTodo : function(e){
			this.props.onSelected( e.currentTarget.dataset.id);
		},
		checkActive:function(i){
	
			if (i == this.props.selectedID)
			{
				return "list-group-item active";
			}
			else
			{
				return "list-group-item ";
			}
		},
		render: function(){	
		    var selectedID = this .props.selectedID;
		
			var allitems =this.props.Todos;

			return <div className="list-group">
			{
				allitems.map(function(item,i){ 
				var _class = "";
				if (i == this.props.selectedID)
                {
                    _class =  "list-group-item active";
                }
                else
                {
                    _class =  "list-group-item ";
                }
				return(
			
					 <a href="#" key={i} data-id={i} className={_class} onClick={this.changeTodo} ><span className="badge" >{item.items.length}</span>{item.name}</a>
				)
			},this)}</div>;
		}
	});
	
	var ToDoApp = React.createClass({
		getInitialState : function(){
			return {Todo:[{name:"parimary",items:[{item:'Todo itme #1',isDone:false},{item:'Todo itme #2',isDone:true},{item:'aaaa',isDone:true},{item:'dddd',isDone:true}
			]},{name:"Secondary",items:[{item:'Todo itme #1',isDone:false},{item:'Todo itme #2',isDone:true},{item:'Todo itme #3',isDone:true}
			]}],filter:[{keyword:'',Status:"SHOW_ALL"}],selectedItem:"0"};
		},
		updateItems: function(newItem){	
			var item = {item:newItem,isDone:false};
			var newtodo = this.state.Todo;
			var allItems = this.state.Todo[this.state.selectedItem].items.concat([item]);
			newtodo[this.state.selectedItem].items = allItems;
			this.setState({
				Todo: newtodo
			});
		},
		deleteItem : function(index){
			var newtodo = this.state.Todo;
			var allItems = this.state.Todo[this.state.selectedItem].items.slice(); //copy array
			allItems.splice(index, 1); //remove element
			newtodo[this.state.selectedItem].items = allItems;
			this.setState({
				Todo: newtodo
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
		AddCatalog: function(newCatalog){
			var Catalog = {name:newCatalog,items:[{item:'Todo itmd #1',isDone:false}]};
			var newtodo = this.state.Todo.concat([Catalog]);
			this.setState({
				Todo: newtodo
			});
		},
		setSelectedCatalog: function(index){
			this.state.selectedItem = index;
			this.setState({
				selectedItem: index
			});
		},
		render: function(){
			return (
				<div className="row">
					<div className="col-xs-3">
                        <ToDoCatalogForm onFormSubmit = {this.AddCatalog} />
                        <ToDoCatelog selectedID = {this.state.selectedItem} onSelected={this.setSelectedCatalog} Todos = {this.state.Todo} />
					</div>
					<div className="col-xs-6">
						<ToDoBanner/>
						<ToDoFilter onFilter = {this.filterItem} onSearch = {this.searchItem} filter={this.state.filter}/>
						<ToDoForm onFormSubmit = {this.updateItems} />
						<ToDoList  items = {this.state.Todo[this.state.selectedItem].items} filter = {this.state.filter} onDelete={this.deleteItem}/>
					</div>
				</div>
			);
		}
	});
	 
	ReactDOM.render(
        <ToDoApp/>,
        document.getElementById('todo')
    );
	