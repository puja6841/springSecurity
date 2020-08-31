import React, { Component, useState, useMemo } from 'react';
import EmployeeService from '../services/EmployeeService';

import axios from 'axios';



class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            employees:[],
            currentPage:1,
            empPerPage:5,
            search:"",
            sortType:"asc",
            checkedBoxes: [],

            

        }

       
		this.deleteEmployees = this.deleteEmployees.bind(this);
		this.toggleCheckbox = this.toggleCheckbox.bind(this);
        

        this.addEmployee=this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
       // this.deleteEmployee=this.deleteEmployee.bind(this);
        //this.addAddress=this.addAddress.bind(this);
    }


    deleteEmployee(id){
        if(window.confirm('Are you sure!')){
         EmployeeService.deleteEmployee(id).then( res => {
             this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
         });
        }
    }

    
    deleteEmployees = () => {
         let arrids=this.state.checkedBoxes;
  console.log('delete employees')
  		if(window.confirm('Are you sure, want to delete the selected Employees?')) {

        axios.delete(`http://localhost:8080/emp/employeesAll/${arrids}`).then(res=>{
            window.location.reload();
        })
    }	
	}

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }


    editEmployee(id){
        this.props.history.push(`/update-employee/${id}`);
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees:res.data});
            console.log(res);
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee');
    }

    
  /*  changePage= event =>{
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage > 1){
            this.setState({
                currentPage:1
            });
        }

    };

    prevPage=()=>{
        if(this.state.currentPage > 1){
            this.setState({
                currentPage:this.state.currentPage -1
            });
        }
    };
    lastPage=()=>{
        if(this.state.currentPage< Math.ceil(this.state.employees.length / this.state.empPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.employees.length / this.state.empPerPage)
            });
        }

    }
    nextPage=()=>{
        if(this.state.currentPage< Math.ceil(this.state.employees.length / this.state.empPerPage)){
            this.setState({
                currentPage:this.state.currentPage +1
            })
        }
    }

*/
    onchange = e=>{
        this.setState({search:e.target.value});
    }

    deleteIds = ()=>{
        let arrayids=[];
        this.state.employees.forEach(d => {
            if(d.select){
                arrayids.push(d.id);
            }
            
        });
    }

    toggleCheckbox = (e, employee) => {		
		if(e.target.checked) {
			let arr = this.state.checkedBoxes;
			arr.push(employee.id);
			
			this.setState = { checkedBoxes: arr};
		} else {			
			let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(employee.id), 1);
			
			this.setState = {
				checkedBoxes: items
			}
		}		
		//console.log(this.state.checkedBoxes);
	}
     
    render() {
      

         const {search, sortType}=this.state;
         
         const filteredEmployee=this.state.employees.filter( employees =>{
             return employees.name.toLowerCase().indexOf(search.toLowerCase())!== -1
             
         })

         const sorted= this.state.employees.sort((a,b)=>{
             const isReversed = (sortType === "asc") ? 1:-1;
             return isReversed * a.name.localeCompare(b.name) 
            

         }); 
         //var merge=[filteredEmployee,sorted];

         //const setEmployeeState=useState({});


       /* const{employees,currentPage,empPerPage}=this.state;
        const lastIndex=currentPage * empPerPage;
        const firstIndex=lastIndex -empPerPage;
        const currentEmployees=employees.slice(firstIndex,lastIndex);
        const totalPages=employees.length / empPerPage;
         
        

        const pageNumCss = {
            width:"45px",
            border: "1px solid #17A2B8",
            color:"#17A2B8",
            testAlign:"center",
            fontWeight:"bold"
            
        }
        */
    
        return (
            <div>
                <h2 className="text-center">Employee List</h2>
                <div className="row">
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                    </div>
                    <div className="col-6">
                    <button className="btn btn-danger" onClick={this.deleteEmployees}> Delete Employees</button>

                    </div>
                    
                     <div className="col" style={{"float":"right"}}>
                        <input placeholder="search here..." icon="search" onChange={this.onchange} />
                    </div> 

                </div>
                

                    <table className="table table-striped table-bordered">

                     <thead>
                         <th>#</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Designation</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </thead> 
                        {/* <TableHeader headers={headers} onSorting={(field,order)=>
                            setSorting(field,order)}/> */}

                        <tbody>

                            {
                               filteredEmployee.map(
                                    employee => 
                                    <tr key = {employee.id}>
                                        <td ><input type="checkbox" value="{employee.id}" 
                                    checked={this.state.checkedBoxes.find((p) => p.id === employee.id)}                                        onChange={(e) => this.toggleCheckbox(e, employee)}/>
									  &nbsp;&nbsp;</td>
                                         <td> { employee.name} </td>   
                                         <td> {employee.emailid}</td>
                                         <td> {employee.designation}</td>
                                         <td> {employee.salary}</td>
                                         
                                         <td>
                                             <button onClick={()=>this.editEmployee(employee.id) } className="btn btn-info">Update</button>
                                             <button style={{marginLeft:"10px"}} onClick={()=>this.deleteEmployee(employee.id) } className="btn btn-danger">Delete</button>
                                             {/* <button style={{marginLeft:"10px"}} onClick={()=>this.addAddress(employee.id) } className="btn btn-danger">Add Address</button> */}

                                             <button style={{marginLeft:"10px"}} onClick={()=>this.viewEmployee(employee.id) } className="btn btn-info">View</button>

                                         </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                  {/*  <Card.Footer>
                        <div style={{"float":"left"}}>
                            Showing page {currentPage} of {totalPages}

                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage===1?true:false}
                                    onClick={this.firstPage}>
                                        
                                        First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage===1?true:false}
                                    onClick={this.prevPage}>
                                        Last
                                    </Button>
                                </InputGroup.Prepend>

                                <FormControl style={pageNumCss} name="currentPage" 
                                onChange={this.changePage}/>

                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage===totalPages?true:false}
                                    onClick={this.nextPage}>
                                        Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage===totalPages?true:false}
                                    onClick={this.lastPage}>
                                        Prev
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                        </div>
                    </Card.Footer>

                */}


            </div>
        );
    }
}


export default ListEmployeeComponent;
