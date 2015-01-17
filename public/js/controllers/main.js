angular.module('noteController', [])

// inject the Note service factory into our controller
.controller('mainController', function($scope, $http, Notes) {
    $scope.formData = {};
    $scope.loading = true;


    // GET 
    // when landing on the page, get all notes and show them
    // use the service to get all the notes
    Notes.get()
        .success(function(data) {
            $scope.todos = data;
            $scope.loading = false;
        });

    // CREATE
    // when submitting the add form, send the text to the node API
    $scope.createNote = function() {
        $scope.loading = true;

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {

            var mult = checkInput($scope.formData.text)

            if (mult === 0) {
                var result = $scope.$eval($scope.formData.text);
                $scope.formData.text = $scope.formData.text + "=" + result;
                angular.toString($scope.formData.text);
            } else {
                console.log("inside nan");
                angular.toString($scope.formData.text);
            }

            // call the create function from our service (returns a promise object)
            Notes.create($scope.formData)

            // if successful creation, call our get function to get all the new notes
            .success(function(data) {
                $scope.loading = false;
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data; // assign our new list of notes
            });

        }
    };

    // DELETE
    // delete note after checking it
    $scope.deleteTodo = function(id) {
        $scope.loading = true;

        Notes.delete(id)

        // if successful creation, call our get function to get all the new todos
        .success(function(data) {
            $scope.loading = false;
            $scope.todos = data; // assign our new list of notes
        });
    };

    $scope.showUpdate = false;
    $scope.getDataForUpdate = function(id) {
        $scope.showUpdate = true;
        $scope.loading = true;
        $scope.selectedId = id;

        console.log("inside update note function");
        Notes.getNoteById(id)
            .success(function(data) {
                console.log("inside update note function" + data);
                $scope.formData = data;
                $scope.loading = false;
            });
    };

    function checkInput(value) {

        console.log("inside checkinput value" + value);

        var bool = isNaN($scope.formData.text);
        var modelValue = parseInt($scope.formData.text, 10);
        var mult = modelValue * 0;
        var t = angular.isNumber(modelValue);

        return mult;
    }

    $scope.updateNotes = function() {
        $scope.loading = true;

        if ($scope.formData.text != undefined) {

            var mult = checkInput($scope.formData.text);

            if (mult === 0) {
                var result = $scope.$eval($scope.formData.text);
                $scope.formData.text = $scope.formData.text + "=" + result;
                angular.toString($scope.formData.text);
            } else {
                console.log("inside nan");
                angular.toString($scope.formData.text);
            }

            // call the create function from our service (returns a promise object)
            Notes.update($scope.formData, $scope.selectedId)

            // if successful creation, call our get function to get all the new notes
            .success(function(data) {
                $scope.loading = false;
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data; // assign our new list of notes
                $scope.showUpdate = false;
            });
        }
    };
});