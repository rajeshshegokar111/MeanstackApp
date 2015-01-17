angular.module('noteService', [])

	// Notes service
	// each function returns a promise object 
	.factory('Notes', function($http) {
		return {
			get : function() {
				return $http.get('/api/notes');
			},

			getNoteById : function(id) {
				console.log("inside getnoteby id function" + id);
				return $http.get('/api/notes/note/' + id);
			},	

			create : function(todoData) {
				return $http.post('/api/notes', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/notes/' + id);
			},

			update : function(todoData, id) {
				return $http.put('/api/notes/note/'+ id, todoData);
			}
		}
	});