import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};
class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            emailid: '',
            designation: '',
            salary: '',
            address1:'',
            address2:'',
            street:'',
            city:'',
            country:'',
            postcode:'',

            isError: {
                name: '',
                emailid: '',
                designation: '',
                salary: '',
                address1:'',
                address2:'',
                street:'',
                city:'',
                country:'',
                postcode:''
            }


        }
        this.formValChange = this.formValChange.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);

    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({
                name: employee.name,
                emailid: employee.emailid,
                designation: employee.designation,
                salary: employee.salary,
               address1:employee.address1,
               address2:employee.address2,
               street:employee.street,
               city:employee.city,
               country:employee.country,
               postcode:employee.postcode
            });
        })

    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            name: this.state.name,
            emailid: this.state.emailid,
            designation: this.state.designation,
            salary: this.state.salary,
            address1:this.state.address1,
               address2:this.state.address2,
               street:this.state.street,
               city:this.state.city,
               country:this.state.country,
               postcode:this.state.postcode
        };

        console.log('employee =>' + JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
            this.props.history.push('/employees');
        })
        .catch(() => window.alert(' You have entered a email address that already exists. Only unique emails are allowed. '))

    }



    cancel() {
        this.props.history.push('/employees');
    }

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
    };

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "name":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "emailid":

                isError.emailid = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "designation":
                isError.designation =
                    value.length < 3 ? "Atleast 3 characaters required" : "";
                break;
            case "salary":
                isError.salary =
                    value.length < 3 ? "Atleast 3 characaters required" : "";
                break;
            case "address1":
                    isError.address1=
                    value.length < 2 ? "Address is required" : "";
                    break;
            case "city":
                    isError.city=
                    value.length < 2 ? "city is required" : "";
                    break;
            case "country":
                    isError.country =
                    value.length < 2 ? "country is required ":"";
                    break;
            case "postcode":
                    isError.postcode =
                    value.length < 6 ? "postcode is required":"";
                    break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
        })
    };

    render() {
        const { isError } = this.state;

        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Name: </label>
                                        <input placeholder=" Name" name="name"
                                            type="text"
                                            value={this.state.name} onChange={this.formValChange}
                                            className={isError.name.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.name.length > 0 && (
                                            <span className="invalid-feedback">{isError.name}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Email Id: </label>
                                        <input placeholder="Email" name="emailid"
                                            value={this.state.emailid} onChange={this.formValChange}
                                            type="email"
                                            className={isError.emailid.length > 0 ? "is-invalid form-control" : "form-control"}


                                        />
                                        {isError.emailid.length > 0 && (
                                            <span className="invalid-feedback">{isError.emailid}</span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label> Designation </label>
                                        {/*<input placeholder="Designation" name="designation" className="form-control" 
                                            value={this.state.designation} 
                                            type="text"
                                            className={isError.designation.length > 0 ? "is-invalid form-control" : "form-control"}
                                            name="designation"
                                            onChange={this.formValChange}
                                            />
                                        */}

                                        <select value="this.state.designation" name="designation"
                                            value={this.state.designation}
                                            className={isError.designation.length > 0 ? "is-invalid form-control" : "form-control"}
                                            onChange={this.formValChange}>
                                            <option value="select">Select---</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Tester">Tester</option>
                                            <option value="Networking">Networking</option>
                                            <option value="Architect">Architect</option>

                                        </select>

                                        {isError.designation.length > 0 && (
                                            <span className="invalid-feedback">{isError.designation}</span>
                                        )}
                                    </div>


                                    <div className="form-group">
                                        <label> Salary </label>
                                        <input placeholder="salary" name="salary" className="form-control"
                                            value={this.state.salary}
                                            type="number"
                                            className={isError.salary.length > 0 ? "is-invalid form-control" : "form-control"}
                                            name="salary"
                                            onChange={this.formValChange}
                                        />
                                        {isError.salary.length > 0 && (
                                            <span className="invalid-feedback">{isError.salary}</span>
                                        )}
                                    </div>

                                    <div className = "form-group">
                                        <label> Address1: </label>
                                        <input placeholder=" Address1" name="address1"
                                        type="text"
                                            value={this.state.address1} onChange={this.formValChange}
                                            className={isError.address1.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.address1.length > 0 && (
                        <span className="invalid-feedback">{isError.address1}</span>
                                        )}
                                    </div>

                                    <div className = "form-group">
                                        <label> Address2: </label>
                                        <input placeholder=" Address2" name="address2"
                                        type="text"
                                            value={this.state.address2} onChange={this.formValChange}
                                            className={isError.address2.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.address2.length > 0 && (
                        <span className="invalid-feedback">{isError.address2}</span>
                                        )}
                                    </div>

                                    <div className = "form-group">
                                        <label> Street: </label>
                                        <input placeholder=" Street" name="street"
                                        type="text"
                                            value={this.state.street} onChange={this.formValChange}
                                            className={isError.street.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.street.length > 0 && (
                        <span className="invalid-feedback">{isError.street}</span>
                                        )}
                                    </div>

                                    <div className = "form-group">
                                        <label> City: </label>
                                        <input placeholder=" City" name="city"
                                        type="text"
                                            value={this.state.city} onChange={this.formValChange}
                                            className={isError.city.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.city.length > 0 && (
                        <span className="invalid-feedback">{isError.city}</span>
                                        )}
                                    </div>

                                    <div className = "form-group">
                                        <label> Country: </label>
                                        <input placeholder=" Country" name="country"
                                        type="text"
                                            value={this.state.country} onChange={this.formValChange}
                                            className={isError.country.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.country.length > 0 && (
                        <span className="invalid-feedback">{isError.country}</span>
                                        )}
                                    </div>

                                    <div className = "form-group">
                                        <label> Postcode: </label>
                                        <input placeholder=" Postcode" name="postcode"
                                        type="number"
                                            value={this.state.postcode} onChange={this.formValChange}
                                            className={isError.postcode.length > 0 ? "is-invalid form-control" : "form-control"}
                                        />
                                        {isError.postcode.length > 0 && (
                        <span className="invalid-feedback">{isError.postcode}</span>
                                        )}
                                    </div>


                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateEmployeeComponent;