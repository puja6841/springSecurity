import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            employee: []
        }
        console.log('employee' + this.employee);
        this.editEmployee = this.editEmployee.bind(this);
        //this.deleteEmployee=this.deleteEmployee.bind(this);
    }
    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        })
    }
    cancel() {
        this.props.history.push('/employees');
    }

    editEmployee(id) {
        this.props.history.push(`/update-employee/${id}`);
    }

    deleteEmployee(id) {
        if (window.confirm('Are you sure!')) {
            EmployeeService.deleteEmployee(id).then(res => {
                this.props.history.push('/employees');

            });
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Employee Details</h3>
                    <br></br>
                    <div className="card-body">

                        <div className="row">
                            <label className="col-sm" style={{ fontWeight: 'bold' }}> Employee Name:: </label>
                            <div className="col-sm"> {this.state.employee.name}</div>
                        </div>

                        <div className="row">
                            <label className="col-sm" style={{ fontWeight: 'bold' }}> Employee Email id:: </label>
                            <div className="col-sm"> {this.state.employee.emailid}</div>
                        </div>
                        <div className="row">
                            <label className="col-sm" style={{ fontWeight: 'bold' }}> Employee Designation:: </label>
                            <div className="col-sm"> {this.state.employee.designation}</div>
                        </div>

                        <div className="row">
                            <label className="col-sm" style={{ fontWeight: 'bold' }}> Employee Salary:: </label>
                            <div className="col-sm"> {this.state.employee.salary}</div>
                        </div>

                        <div className="row">
                            <label className="col-sm" style={{ fontWeight: 'bold' }}> Employee Address:: </label>
                            <div className="col-sm"> {this.state.employee.address1} {this.state.employee.address2},
        {this.state.employee.street} {this.state.employee.city}, {this.state.employee.country}-
        {this.state.employee.postcode}</div>
                        </div>


                    </div>
                    <div>
                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Back</button>
                        <button className="btn btn-info" onClick={() => this.editEmployee(this.state.employee.id)} style={{ marginLeft: "10px" }}>Update</button>
                        <button className="btn btn-danger" onClick={() => this.deleteEmployee(this.state.employee.id)} style={{ marginLeft: "10px" }}>Delete</button>

                        {/* <button style={{marginLeft:"10px"}} onClick={()=>this.deleteEmployee(this.state.employee.id) } className="btn btn-danger">Delete</button> */}

                        <br></br>
                    </div>
                    <br></br>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;