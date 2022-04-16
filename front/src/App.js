import React, {useEffect, useState} from 'react';
import './App.css';
import StudentCards from './StudentCards/StudentCards';

function App() {

  let [students, setStudents] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [editingId, setEditingId] = useState("")
  let [searchTag, setSearchTag] =useState("")
  let [editingName, setEditingName] = useState("")
  let [editingSurname, setEditingSurname] = useState("")
  let [name, setName] = useState("")
  let [surname, setSurname] = useState("")
  let [age, setAge] = useState(0)

  const fetchData = () =>{
    fetch('http://localhost:3000/api/v1/students/')
    .then(response => response.json())
    .then(data => {
      setStudents(data.data.students)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  function deleteStudent(id){
    fetch('http://localhost:3000/api/v1/students/' + id, { method: 'DELETE' })
    .then((data) => {
      fetchData();
    });
  }

  function editStudent(id, name, surname, age){
    console.log("editing" + id)
    setEditingId(id)
    setEditingName(name)
    setEditingSurname(surname)
    setName(name)
    setSurname(surname)
    setAge(age)
  }

  function createOrUpdateStudent(e){
    e.preventDefault();
    if(editingId){
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, surname: surname, age: age})
        
    };
      fetch('http://localhost:3000/api/v1/students/'+ editingId, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchData()
        cancelEditing();
      });
    }else{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, surname: surname, age: age})
    };
      fetch('http://localhost:3000/api/v1/students/', requestOptions)
      .then(response => response.json())
      .then(data => {
        fetchData();
      });
    }
  }


  function cancelEditing(){
    setEditingId("")
    setEditingName("")
    setEditingSurname("")
    setName("")
    setSurname("")
    setAge("")
  }

  return (
    <div className="App">
      <div className='leftSide'>
        <div className='leftSideSearch'>
            <label for="search">Search</label>
            <input type="text" name="search" onChange={(e)=>{setSearchTag(e.target.value)}} placeholder="search"></input>
        </div>
      <form onSubmit={(e)=>{createOrUpdateStudent(e)}} className="addStudentForm">
        {editingId ? <div className='editStudentTitle'>Editing student {editingName} {editingSurname}, ID: {editingId} <button onClick={()=>{cancelEditing()}}>Cancel</button></div>: <div>Add a new Student</div>}
        <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="name" required></input>
        <input type="text" onChange={(e)=>{setSurname(e.target.value)}} value={surname} placeholder="surname" required></input>
        <input type="number" onChange={(e)=>{setAge(e.target.value)}} value={age} placeholder="age" required></input>
        <button type="submit">Submit</button>
      </form>
      </div>
      <div className='students'>
      {!isLoading && students.filter(student=> student.name.toLowerCase().includes(searchTag.toLowerCase()) || student.surname.toLowerCase().includes(searchTag.toLowerCase())).map((student) =>(
        <StudentCards id={student._id} name={student.name} surname={student.surname} age={student.age} editStudent={editStudent} deleteStudent={deleteStudent}/>))}
      </div>
    </div>
  );
}

export default App;
