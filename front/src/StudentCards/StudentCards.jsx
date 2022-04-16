import React from 'react'

const StudentCards = (props) => {
    let {id, name, surname, age, editStudent, deleteStudent} = props
  return (
    <div className='studentCard'>
        <div className='studentCardTitle'>
            {name}
        </div>
        <div className='studentCardInfo'>
            <div>{surname}</div>
            <div>Age: {age}</div>
        </div>
        <div className='studentCardBtn'>
            <button onClick={()=>{deleteStudent(id)}}>Delete</button>
            <button onClick={()=>{editStudent(id, name, surname, age)}}>Edit</button>
        </div>
    </div>
  )
}

export default StudentCards