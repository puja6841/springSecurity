package com.example.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="employee",uniqueConstraints=
	@UniqueConstraint(columnNames={"emailid"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employee{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column(name="name")
	private String name;
	@Column(name="emailid", unique = true)
	private String emailid;
	@Column(name="designation")
	private String designation;
	@Column(name="salary")
	private long salary;
	
	@Column(name = "address1", nullable = false)
	private String address1;
	@Column(name = "address2")
	private String address2;
	@Column(name = "street")
	private String street;
	@Column(name="city", nullable = false)
	private String city;
	@Column(name="country", nullable = false)
	private String country;
	@Column(name="postcode", nullable = false, length=6)
	private long postcode;

	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmailid() {
		return emailid;
	}
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public long getSalary() {
		return salary;
	}
	public void setSalary(long salary) {
		this.salary = salary;
	}
	
	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public long getPostcode() {
		return postcode;
	}

	public void setPostcode(long postcode) {
		this.postcode = postcode;
	}

	
	public Employee(long id, String name, String emailid, String designation, long salary, String address1,
			String address2, String street, String city, String country, long postcode) {
		super();
		this.id = id;
		this.name = name;
		this.emailid = emailid;
		this.designation = designation;
		this.salary = salary;
		this.address1 = address1;
		this.address2 = address2;
		this.street = street;
		this.city = city;
		this.country = country;
		this.postcode = postcode;
	}
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", emailid=" + emailid + ", designation=" + designation
				+ ", salary=" + salary + ", address1=" + address1 + ", address2=" + address2 + ", street=" + street
				+ ", city=" + city + ", country=" + country + ", postcode=" + postcode + "]";
	}

	
	
	

	
	
	

}
