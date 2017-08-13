/**
 * 
 */
package com.capitalone.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.capitalone.demo.domain.User;

/**
 * @author e80620
 *
 */
public interface UserRepository extends MongoRepository<User, String> {
	
	public User findById(String id);
    public List<User> findByFirstName(String firstName);
    public List<User> findByLastName(String lastName);

}