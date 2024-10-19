// doj -> (0000) likha hai issliye kyuki page pahle load hota hai useeffect baad mai kam kerta hai

import { Link,useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";
import { validateForm } from "./Validation";


export default function UpdateEmp() {


  let {id} =useParams();
  const [employee,setEmployee]=useState({doj:"0000-00-00"})
  const [errors,setErrors] =useState({});
  useEffect(()=>{
    axios.get("http://localhost:3000/"+id)
      .then((r)=>{
        console.log(r.data);
        setEmployee(r.data)
        

  })
  },[])


  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault();
    console.log(employee);
    const newErrors = validateForm(employee);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0){
    axios.put("http://localhost:3000/"+id,employee)
    .then((r)=>{
      console.log(r);
      navigate('/');

    })
  }
     else 
     console.log('Form submission failed due to validation errors');
  }


  return (
    <>
     <>
<div className='text-bg-primary p-4'>
      <h2>Update Employee </h2> <hr /> </div>
      <div className='container mt-3'>
      <div className='text-end mb-3'>
    <Link to="/" className="btn btn-sm btn-success">Employees</Link>
    </div>
    
    <form>
    {errors.name && <span className="text-danger"> * {errors.name} </span>}

      <div className="input-group mb-3">
        <span className="input-group-text">Employee Name</span>
        <input type="text" className="form-control"
        value={employee.name}
        onChange={(e)=>setEmployee({...employee,name:e.target.value})}
        />
      </div>
     
      {errors.email && <span className="text-danger"> * {errors.email} </span>}
      {errors.phone && <span className="text-danger"> * {errors.phone} </span>}

      <div className="input-group mb-3">
        <span className="input-group-text">Email Address</span>
        <input type="email" className="form-control"
                value={employee.email}

       onChange={(e)=>setEmployee({...employee,email:e.target.value})}

        />
        <span className="input-group-text">Contact No.</span>
        <input type="tel" className="form-control"
                value={employee.phone}

         onChange={(e)=>setEmployee({...employee,phone:e.target.value})}

        />

      </div>
        
      {errors.dept && <span className="text-danger"> * {errors.dept} </span>}
      {errors.salary && <span className="text-danger"> * {errors.salary} </span>}
      {errors.doj && <span className="text-danger"> * {errors.doj} </span>}

      <div className="input-group mb-3">
        <span className="input-group-text">Department</span>
        <input type="text" className="form-control"
                value={employee.dept}

                onChange={(e)=>setEmployee({...employee,dept:e.target.value})}

        />
        <span className="input-group-text">Salary</span>
        <input type="number" className="form-control"
                value={employee.salary}

        onChange={(e)=>setEmployee({...employee,salary:e.target.value})}

        />
        <span className="input-group-text">DOJ</span>
        <input type="date" className="form-control"
        value=  {employee.doj.slice(0,10)}

        onChange={(e)=>setEmployee({...employee,doj:e.target.value})}

        />

      </div>
     <button className="btn btn btn-success"
     onClick={handleSubmit}>Save Details</button>
      
     </form>

      </div>

    </>
 
    </>
  )
}
