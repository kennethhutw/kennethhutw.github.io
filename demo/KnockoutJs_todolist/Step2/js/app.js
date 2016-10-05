(function(){
	'use strict'
	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;
	
	function keyhandlerBindingFactory(keyCode){
		return {
			init: function(element, valueAccessor, allBindingsAccessor, data, bindingContext){
				var wrappedHandler, newValueAccessor;
				
				wrappedHandler = function(data, event){
					if(event.keyCode == keyCode){
						valueAccessor().call(this, data, event);
					}
				};
				
				newValueAccessor = function(){
					return{
						keyup: wrappedHandler
					};
				};
				ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
			}
		};
	}
	
	ko.bindingHandlers.enterKey = keyhandlerBindingFactory(ENTER_KEY);
	
	ko.bindingHandlers.escapeKey = keyhandlerBindingFactory(ESCAPE_KEY);
	
	ko.bindingHandlers.selectAndFocus = {
		init: function(element, valueAccessor, allBindingsAccessor, bindingContext){
			ko.bindingHandlers.hasFocus.init(element, valueAccessor, allBindingsAccessor, bindingContext);
			ko.utils.registerEventHandler(element, 'focus', function(){
				element.focus();
			});
		},
		update: function(element, valueAccessor){
			ko.utils.unwrapObservable(valueAccessor());
			setTimeout(function(){
				ko.bindingHandlers.hasFocus.update(element, valueAccessor);
			}, 0);
		}
		
	};
	
	var Todo = function(title, completed){
		this.title = ko.observable(title);
		this.completed = ko.observable(completed);
		this.editing = ko.observable(false);
	};
	
	var ViewModel = function(todos){
		
		this.todos = ko.observableArray(todos.map(function(todo){
			return new Todo(todo.title, todo.completed);
		}));
		
		this.current = ko.observable();
		
		this.showMode = ko.observable('all');
		
		this.query = ko.observable('');
		
		this.isActive = function(title){
			if(this.showMode() === title)
			{
				return 'active';
			}
			else
				return '';
			
		};
		
		this.filteredTodos = function(todo) {
			var result = true;
				switch(this.showMode()){
              case 'active':
				if(todo.completed() != false)
					result = false;
				break;
				case 'completed':
				 if(todo.completed() != true)
					 result = false
			   break;
				}
		    if(result){
				var filter = this.query().toLowerCase();
				if(!filter){
					return true;
				}
				else{
				  return todo.title().toLowerCase().indexOf(filter) !== -1;
				}
			}else
			{
				return false;
			}
        };
		
		
		this.add = function(){
			var current = this.current().trim();
			if(current){
				this.todos.push(new Todo(current,false));
				this.current('');
			}
		}.bind(this);
		
		this.remove = function(todo){
			this.todos.remove(todo);
		}.bind(this);
		
		this.removeCompleted = function(){
			this.todos.remove(function(todo){
				return todo.completed();
			});
		}.bind(this);
		
		this.editItem = function(item){
			item.editing(true);
			item.previousTitle = item.title();
		}.bind(this);
		
		this.saveEditing = function(item){
			item.editing(false);
			
			var title = item.title();
			var trimmedTitle = title.trim();
			
			if(title !== trimmedTitle){
				item.title(trimmedTitle);
			}
			
			if(!trimmedTitle){
				this.remove(item);
			}
		}.bind(this);
		
		this.cancelEditing = function(item){
			item.editing(false);
			item.title(item.previousTitle);
		}.bind(this);
		
		this.completedCount = ko.computed(function(){
			return this.todos().filter(function(todo){
				return todo.completed();
			}).length;
		}.bind(this));
		
		this.remainingCount = ko.computed(function(){
			return this.todos().length - this.completedCount();
		}.bind(this));
		
		this.allCompleted = ko.computed({
			read: function(){
				return !this.remainingCount();
			}.bind(this),
			write: function(newValue){
				this.todos().forEach(function(todo){
					todo.completed(newValue);
					todo.textDecoration(newValue);
				});
			}.bind(this)
		});
		
		this.getLabel = function(count){
			return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
		}.bind(this);
		
		ko.computed(function(){
			localStorage.setItem('todos-knockoutjs', ko.toJSON(this.todos));
		}.bind(this)).extend({
			rateLimit: {timeout: 500, method: 'notifyWhenChangesStop'}
		});
	};
	
	var todos = ko.utils.parseJson(localStorage.getItem('todos-knockoutjs'));
	
	var viewModel = new ViewModel(todos || []);
	ko.applyBindings(viewModel);
	
	Router({'/:filter': viewModel.showMode}).init();
	
}());