const express= require('express');
const app = express();

app.use(express.json());


const courses = [{ id: '1', course: 'Course1 '}, { id: '2', course: 'course 2 '}, { id: '3', course: 'course3'}]

app.get('/', (req, res)=>{
    res.send('Welcome to creation of Restful API');
})
 
app.get('/courses', (req, res)=>{
    res.send(courses)

})

app.get('/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course)
    
    res.send(course)


})
app.post('/courses', (req, res)=>{
    course = {
        id : courses.length+1,
        body: req.body
    }
    courses.push(course)
    res.send(courses)
})

app.put('/courses/:id', (req, res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    course.name = req.body.name
    req.save(course)

    res.send(course)

})




app.listen(5000, console.log('listening to port 5000'))




