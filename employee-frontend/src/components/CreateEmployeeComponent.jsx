import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);        
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then( (res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
        }
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.navigate('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.navigate('/employees');
            });                        
        }
    }

    cancel() {
        this.props.navigate('/employees');
    }

    getTitle() {                
        if (this.state.id === '_add') {                                    
            return <h3 className='text-center'>Add Employee</h3>            
        } else {                        
            return <h3 className='text-center'>Update Employee</h3>
        }
    }

    render() {
        return (
            <div>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <br />
                            {
                                this.getTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label> First Name: </label>
                                        <input 
                                            placeholder='First Name' 
                                            name='firstName' 
                                            className='form-control' 
                                            value={this.state.firstName} 
                                            onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <br />
                                    <div className='form-group'>
                                        <label> Last Name: </label>
                                        <input 
                                            placeholder='Last Name' 
                                            name='lastName' 
                                            className='form-control' 
                                            value={this.state.lastName} 
                                            onChange={this.changeLastNameHandler} />
                                    </div>
                                    <br />
                                    <div className='form-group'>
                                        <label> Email Id: </label>
                                        <input 
                                            placeholder='Email Address' 
                                            name='emailId' 
                                            className='form-control' 
                                            value={this.state.emailId} 
                                            onChange={this.changeEmailHandler} />
                                    </div>
                                    <br />
                                    <button className='btn btn-success' onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function CreateWithNavigate(props){
    const navigate = useNavigate();
    const params = useParams();
    return <CreateEmployeeComponent {...props} navigate={navigate} params={params}/>    
}

export default CreateWithNavigate;