/**
 * 
 */
package com.capitalone.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;

import org.springframework.data.annotation.Id;
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
    public String email;
    public String password;
    public Date createdDate;
    public Date updatedDate;
    
    public User() {
    	
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
