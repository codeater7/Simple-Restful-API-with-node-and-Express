const Joi = require('joi');
// We get class named Joi so it is capatalized For vaidation
const express = require('express');
const app = express();
app.use(express.json());
// express.json will return a piece of middleware and then we call app.use to use that middleware

const courses = [{ id: 1, name: 'course1 ' }, { id: 2, name: 'course2 ' }, { id: 3, name: 'course3 ' }];
// (path , callbackfunction, it again has two parameter, it is also called Route handler)
app.get('/', (req, res) => {
	res.send('hello world');
});
app.get('/api/courses', (req, res) => {
	// In real work here is work of database
	res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(400).send('given course was not found');
	res.send(course);
});

app.post('/api/courses', (req, res) => {
	const { error } = validateCourse(req.body); //destructuring const result = Joi.validateCourse(req.body)
	if (error) return res.status(400).send(error.details[0].message);
		
	
	const course = {
		id: courses.length + 1,
		name: req.body.name,
		// to read this we need to enable parsing of json objects for that we did app.use(express.json)
	};
	courses.push(course);
	res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
	// look up the course, if not existing return 404

	const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(400).send('given course  with the id was not found');
    
    //validate, if invalid, return 400- Bad request

    const { error } = validateCourse(req.body);    // const result = validateCourse(req.body) // result has error // result.error
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
    }
     // update course
    course.name = req.body.name;
    // return  the updated course
	res.send(course);
});

app.delete('/api/courses/:id', (req,res)=>{
    //look up the course
    //Not existing return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(400).send('given course  with the id was not found')

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    
    //Return the same course
    res.send(course);

    

})

function validateCourse(course) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
	};
	return Joi.validate(course, schema);
}
//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on terminal ${port}`));
