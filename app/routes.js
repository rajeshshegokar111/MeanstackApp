var Note = require('./models/note');

module.exports = function(app) {

    // api
    // get all notes
    app.get('/api/notes', function(req, res) {
        console.log("inside all notes api");
        // use mongoose to get all notes in the database
        Note.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all notes in JSON format
        });
    });

    app.get('/api/notes/note/:todo_id', function(req, res) {

        // use mongoose to get note in the database        

        Note.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    });

    // create notes and send back all notes after creation
    app.post('/api/notes', function(req, res) {

        // create a notes, information comes from AJAX request from Angular
        Note.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the notes after you create another
            Note.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a notes
    app.delete('/api/notes/:todo_id', function(req, res) {
        Note.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the notes after you create another
            Note.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    app.put('/api/notes/note/:todo_id', function(req, res) {
        // var task = request.body;
        // var taskId = request.params.todo_id;

        Note.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);

            todo.text = req.body.text;

            todo.save(function(err) {
                if (err)
                    res.send(err);

                // res.json({
                //     message: 'Bear updated!'
                // });
                Note.find(function(err, todos) {
                    if (err)
                        res.send(err)
                    res.json(todos);
                });
            });

            //res.json(todo);
        });

    });


    // application index file
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the index.html view file (angular will handle changes on the front-end)
    });
};
