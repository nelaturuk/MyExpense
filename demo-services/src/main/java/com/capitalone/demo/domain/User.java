/**
 * 
 */
package com.capitalone.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Calendar;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

/**
 * @author e80620
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
	
	@Id
    public String id;

    public String firstName;
    public String lastName;
    public Date createdDate;
    public Date updatedDate;
    
    public User() {
    	
    }
    
    public User(String fname, String lname) {
    	this.firstName = fname;
    	this.lastName = lname;
    	this.createdDate = new Date();
    	this.updatedDate = new Date();
    }
    
    @Override
    public String toString() {
        return "User{" +
                ", name='" + firstName + ' ' + lastName + '\'' +
                ", createdDate='" + createdDate + '\'' + 
                ", updatedDate='" + updatedDate + '\'' + 
                '}';
    }

}
