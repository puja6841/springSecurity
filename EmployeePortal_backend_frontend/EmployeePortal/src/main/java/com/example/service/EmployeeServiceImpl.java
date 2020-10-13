package com.example.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.bean.Employee;
import com.example.bean.Exception.ResourceNotFoundException;
import com.example.repository.EmployeeRepository;


@Service
public class EmployeeServiceImpl{
	@Autowired
	EmployeeRepository empRepo;
	
	public List<Employee> getEmployees() {
        return empRepo.findAll();
    }


    public Employee getEmployeeById(Long employeeId) {
        if (!empRepo.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employee with id " + employeeId + " not found");
        }
        return empRepo.getOne(employeeId);
    }


    public Employee createEmployee(Employee employee) {
        return empRepo.save(employee);

    }

    public Employee updateEmployeeById(Long employeeId, Employee employee) {
        if (!empRepo.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employee with id " + employeeId + " not found");
        }
        Optional<Employee> emp = empRepo.findById(employeeId);

        if (!emp.isPresent()) {
            throw new ResourceNotFoundException("Employee with id " + employeeId + " not found");
        }

        Employee emp1 = emp.get();
        emp1.setName(employee.getName());
        emp1.setEmailid(employee.getEmailid());
        emp1.setDesignation(employee.getDesignation());
        emp1.setSalary(employee.getSalary());
        emp1.setAddress1(employee.getAddress1());
        emp1.setAddress2(employee.getAddress2());
        emp1.setStreet(employee.getStreet());
        emp1.setCity(employee.getCity());
        emp1.setCountry(employee.getCountry());
        emp1.setPostcode(employee.getPostcode());
       
        return empRepo.save(emp1);
        
        
        

    }

    public ResponseEntity<Object> deleteEmployeeById(long employeeId) {
        if (!empRepo.existsById(employeeId)) {
            throw new ResourceNotFoundException("Employee with id " + employeeId + " not found");
        }

        empRepo.deleteById(employeeId);

        return ResponseEntity.ok().build();

    }
    
    public ResponseEntity<?> deleteEmployeeIds(List<Long> employeeIds){
    	employeeIds.forEach(d->{
    		if(empRepo.existsById(d)) {
    	        empRepo.deleteById(d);

    		}
    	});
    	return ResponseEntity.ok().build();
    }

	
}
