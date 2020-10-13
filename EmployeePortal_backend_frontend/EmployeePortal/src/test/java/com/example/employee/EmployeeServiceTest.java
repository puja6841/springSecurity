package com.example.employee;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Matchers.any;


import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.bean.Employee;
import com.example.repository.EmployeeRepository;
import com.example.service.EmployeeServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
class EmployeeServiceTest {

	@BeforeEach
	void setUp() throws Exception {
	}

	@Test
	void test() {
		fail("Not yet implemented");
	}

	
	@Autowired
	EmployeeServiceImpl empService;
	
	@MockBean
	EmployeeRepository empRepo;
	
	@Test
	public void testCreateEmployee() {
		Employee emp=new Employee();
		//emp.setId(3);
		emp.setName("kalyan");
		emp.setEmailid("kalyan@gmail.com");
		emp.setDesignation("developer");
		emp.setSalary(23009);
		emp.setAddress1("khad");
		emp.setAddress2("elp");
		emp.setStreet("elp");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		
		Mockito.when(empRepo.save(emp)).thenReturn(emp);
		
		assertThat(empService.createEmployee(emp)).isEqualTo(emp);
	}

	@Test
	public void testGetEmployeeById() {
		Employee emp=new Employee();
		emp.setId(21l);
		emp.setName("riya");
		emp.setEmailid("riya@gmail.com");
		emp.setDesignation("dev");
		emp.setSalary(23000);
		emp.setAddress1("kk");
		emp.setAddress2("kk");
		emp.setStreet("kk");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		
		Mockito.when(empRepo.getOne(21l)).thenReturn(emp);
		assertThat(empService.getEmployeeById(21l)).isEqualTo(emp);
	}
	
	@Test
	public void testGetAllEmployee() {
		Employee emp=new Employee();
		emp.setId(3);
		emp.setName("kalyan");
		emp.setEmailid("kalyan@gmail.com");
		emp.setDesignation("developer");
		emp.setSalary(23009);
		emp.setAddress1("khad");
		emp.setAddress2("elp");
		emp.setStreet("elp");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		
		Employee emp1=new Employee();
		emp1.setId(3);
		emp1.setName("k");
		emp1.setEmailid("k@gmail.com");
		emp1.setDesignation("developer");
		emp1.setSalary(23009);
		emp.setAddress1("khad");
		emp.setAddress2("elp");
		emp.setStreet("elp");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		
		List<Employee> empList=new ArrayList<>();
		empList.add(emp);
		empList.add(emp1);
		
		Mockito.when(empRepo.findAll()).thenReturn(empList);
		assertEquals(2, empService.getEmployees().size());
		//assertThat(empService.getEmployees()).isEqualTo(empList);
	}
	

	@Test
	public void testDeleteEmployee() {
		Employee emp=new Employee();
		emp.setId(3);
		emp.setName("kalyan");
		emp.setEmailid("kalyank@gmail.com");
		emp.setDesignation("developer");
		emp.setSalary(23009);
		emp.setAddress1("khad");
		emp.setAddress2("elp");
		emp.setStreet("elp");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		
		Mockito.when(empRepo.getOne(1l)).thenReturn(emp);
		Mockito.when(empRepo.existsById(emp.getId())).thenReturn(false);
		assertFalse(empRepo.existsById(emp.getId()));
	}
	
	@Test
	public void testUpdateEmployee() {
		Employee emp=new Employee();
		emp.setId(3l);
		emp.setName("kalyan");
		emp.setEmailid("kalyan@gmail.com");
		emp.setDesignation("developer");
		emp.setSalary(23009);
		emp.setAddress1("khad");
		emp.setAddress2("elp");
		emp.setStreet("elp");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		Mockito.when(empRepo.getOne(3l)).thenReturn(emp);
		
		emp.setName("kalyan");
		Mockito.when(empRepo.save(emp)).thenReturn(emp);
		
		assertThat(empService.updateEmployeeById(3l, emp)).isEqualTo(emp);
	}
  
}
