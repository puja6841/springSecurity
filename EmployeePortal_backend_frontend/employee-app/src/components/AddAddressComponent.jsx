import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class AddAddressComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            employees:[],
            address1:'',
            address2:'',
            street:'',
            city:'',
            country:'',
            pincode:'',
            id :this.props.match.params.id 

        }
    }

    componentDidMount(){

        EmployeeService.getAddressById(this.state.id).then((res)=>{
            let employees=res.data;
            this.setState({
                address1:employees.address1,
            address2:employees.address2,
            street:employees.street,
            city:employees.city,
            country:employees.country,
            pincode:employees.pincode
            });
            console.log(res);
        })
    }

    address1Change= event =>{
        this.setState({
            address1:event.target.value
        })
    }
    address2Change= event =>{
        this.setState({
            address2:event.target.value
        })
    }

    streetChange= event =>{
        this.setState({
            street:event.target.value
        })
    }

    cityChange= event =>{
        this.setState({
            city:event.target.value
        })
    }

    countryChange= event =>{
        this.setState({
            country:event.target.value
        })
    }

    pincodeChange= event =>{
        this.setState({
            pincode:event.target.value
        })
    }

    addAddress = (e)=>{
        e.preventDefault();
        let address={address1:this.state.address1,
            address2:this.state.address2,
            street:this.state.street,
            city:this.state.city,
            country:this.state.country,
            pincode:this.state.pincode };

        //console.log('employee =>'+ JSON.stringify(address));

        EmployeeService.addAddressByEmployeeId( this.state.id, address).then((res)=>{
            this.props.history.push('/employees');
        })
        
    }
    
    
    render() {
        return (
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="col lg-6">
                        <form>
                            <div className="form-group">
                                <input onChange={this.address1Change} className="form-control"/>
                            </div>

                            <div className="form-group">
                                <input onChange={this.address2Change} className="form-control"/>
                            </div>

                            <div className="form-group">
                                <input onChange={this.streetChange} className="form-control"/>
                            </div>

                            <div className="form-group">
                                <input onChange={this.cityChange} className="form-control"/>
                            </div>

                            <div className="form-group">
                                <input onChange={this.countryChange} className="form-control"/>
                            </div>

                            <div className="form-group">
                                <input onChange={this.pincodeChange} className="form-control"/>
                            </div>
                            <button className="btn btn-block btn-primary" onClick={this.addAddress}>Submit</button>
                        </form>
        
                    </div>

                    <div className="col lg-6">
                        <table className="table">
                            <thead>
                                <th>Address1</th>
                                <th>Address2</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Pincode</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </thead>

                            <tbody>
                                {this.state.employees.map(employee=>
                                    
                                   
                                <tr>
                                    <td>{employee.address1}</td>
                                    <td>{employee.address2}</td>
                                    <td>{employee.street}</td>
                                    <td>{employee.city}</td>
                                    <td>{employee.country}</td>
                                    <td>{employee.pincode}</td>
                                    

                                    <td>
                                        <button className="btn btn-sm btn-primary">
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-danger">
                                        <i className="fa fa-trash"></i>

                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                </div>
                
            </div>
        );
    }
}

export default AddAddressComponent;