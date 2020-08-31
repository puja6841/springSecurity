package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bean.Employee;
import com.example.service.EmployeeServiceImpl;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value={"/emp"})
public class EmployeeController {
	@Autowired
	EmployeeServiceImpl empService;
	
	//all employee data
    @GetMapping(value = "/employees", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Employee> getEmployees() {
        return empService.getEmployees();
    }

    //create the employee
    
    @PostMapping(value = "/employees", produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee create(@RequestBody Employee employee) {
        return empService.createEmployee(employee);
    }



    //get with employeeid 
    @GetMapping(value = "/employees/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee getEmployeeById(@PathVariable(value = "employeeId") Long employeeId) {
        return empService.getEmployeeById(employeeId);
    }

    //update with empid
    @PutMapping(value = "/employees/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Employee update(@PathVariable(value = "employeeId") Long employeeId, @RequestBody Employee employee) {
        return empService.updateEmployeeById(employeeId, employee);
    }

    //delete with id
    @DeleteMapping(value = "/employees/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> deleteEmployeeById(@PathVariable(value = "employeeId") long employeeId) {
        return empService.deleteEmployeeById(employeeId);
    }
    
    //delete employee ids
    @DeleteMapping(value = "/employeesAll/{employeeIds}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteEmployeeByIds(@PathVariable(value = "employeeIds") List<Long> employeeIds) {
       return empService.deleteEmployeeIds(employeeIds);
    }
    
	
    
}
