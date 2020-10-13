package com.example.employee;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.example.bean.Employee;
import com.example.controller.EmployeeController;
import com.example.service.EmployeeServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(value=EmployeeController.class)
class TestEmployeeController {

	@MockBean
	EmployeeServiceImpl empService;
	
	@MockBean
	EmployeeController empController;
	
    @Autowired
    MockMvc mockMvc;
    
	@BeforeEach
	void setUp() throws Exception {
	}

	@Test
	void test() {
		fail("Not yet implemented");
	}
	
	@Test
	public void testCreateEmployee() throws Exception {
	
		Employee emp=new Employee();
		emp.setId(21);
		emp.setName("ria");
		emp.setEmailid("ria@gmail.com");
		emp.setDesignation("dev");
		emp.setSalary(23000);
		emp.setAddress1("kk");
		emp.setAddress2("kk");
		emp.setStreet("kk");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		String inputInJson=this.mapToJson(emp);
		String URI="emp/employees";
		
		Mockito.when(empService.createEmployee(Mockito.any(Employee.class))).thenReturn(emp);
		
		RequestBuilder requestBuilder=MockMvcRequestBuilders
				.post(URI)
				.accept(MediaType.APPLICATION_JSON).content(inputInJson)
				.contentType(MediaType.APPLICATION_JSON);
		
		MvcResult result=mockMvc.perform(requestBuilder).andReturn();

		MockHttpServletResponse response=result.getResponse();
		
		String outputInJson=response.getContentAsString();
		
		assertThat(outputInJson).isEqualTo(inputInJson);
		assertEquals(HttpStatus.OK.value(), response.getStatus());
		
		
		
				
	}
	
	@Test
	public void testGetEmployeeById() throws Exception{
		Employee emp=new Employee();
		emp.setId(21);
		emp.setName("ria");
		emp.setEmailid("ria@gmail.com");
		emp.setDesignation("dev");
		emp.setSalary(23000);
		emp.setAddress1("kk");
		emp.setAddress2("kk");
		emp.setStreet("kk");
		emp.setCity("pune");
		emp.setCountry("india");
		emp.setPostcode(411020);
		
		Mockito.when(empService.getEmployeeById(Mockito.anyLong())).thenReturn(emp);
		
		String URI="/emp/employees/21";
		
		RequestBuilder requestBuilder=MockMvcRequestBuilders
				.get(URI)
				.accept(MediaType.APPLICATION_JSON);
		
		MvcResult result=mockMvc.perform(requestBuilder).andReturn();

		String expectedOutput=this.mapToJson(emp);
		String outputInJson=result.getResponse().getContentAsString();
		
		assertThat(outputInJson).isEqualTo(expectedOutput);
		
		
	}
	

	
	@Test
	public void testGetAllEmployee() throws Exception{
		Employee emp=new Employee();
		emp.setId(1);
		emp.setName("puja");
		emp.setEmailid("puja@gmail.com");
		emp.setDesignation("developer");
		emp.setSalary(23000);
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
		emp1.setAddress1("khad");
		emp1.setAddress2("elp");
		emp1.setStreet("elp");
		emp1.setCity("pune");
		emp1.setCountry("india");
		emp1.setPostcode(411020);
		
		
		List<Employee> empList=new ArrayList<>() ;
			empList.add(emp);
			empList.add(emp1);
			
			Mockito.when(empService.getEmployees()).thenReturn(empList);
			
			String URI="emp/employees";
			
			RequestBuilder requestBuilder=MockMvcRequestBuilders
					.get(URI)
					.accept(MediaType.APPLICATION_JSON);
			
			MvcResult result=mockMvc.perform(requestBuilder).andReturn();

			String expectedOutput=this.mapToJson(empList);
			String outputInJson=result.getResponse().getContentAsString();
			
			assertThat(outputInJson).isEqualTo(expectedOutput);
		
	}
	
	

	private String mapToJson(Object object) throws JsonProcessingException{
		ObjectMapper objectMapper=new ObjectMapper();
		return objectMapper.writeValueAsString(object);
	}
	
	
}
