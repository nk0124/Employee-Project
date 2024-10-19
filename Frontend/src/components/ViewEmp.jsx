
// import useparams for id 
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from "axios";
import userimg from "../assets/user.png"

export default function ViewEmp() {
  let {id}   = useParams();
  const [employee,setEmployee]=useState({})

  useEffect(()=>{
    axios.get("http://localhost:3000/"+id)
      .then((r)=>{
        console.log(r.data);
        setEmployee(r.data)
        

  })
  },[])


 // const [employee,setEmployee]=useState(
  //  {
  //    name :"",email:"",phone:"",doj:"2014-11-11",dept:"x", salary:"10",image:""})

  return (
    <>

    <div className='text-bg-primary p-4'>
          <h2> Employee Profile </h2> <hr /> </div>
          <div className='container mt-3'>
          <div className='text-end mb-3'>
    <Link to="/" className="btn btn-sm btn-success">Employees</Link>
    </div>

    <div className="row">
      <div className="col text-center pt-4">

        {employee.image!=null ?
        <img src={employee.image} alt ="" height={200} width={200}/>
        : <img src={userimg} alt ="" height={200} width={200}/>}

        <div className="mt-4">
        <Link to={"/image/"+id} className="text-success text-decoration-none">Edit Image</Link>

        </div>
     </div>

     <div className="col">
      <h1>{employee.name}</h1><hr/>
      <p>Working In {employee.dept} Department</p><hr/>
      <p>Contact Details : {employee.email} | {employee.phone}</p> <hr/>
      <p> Joined On :{employee.doj}</p><hr/>


     </div>

    </div>

          </div>
    
        </>
     
  )
}
