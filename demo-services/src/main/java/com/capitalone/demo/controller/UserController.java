/**
 * 
 */
package com.capitalone.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capitalone.demo.domain.User;
import com.capitalone.demo.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepository repository;

	@RequestMapping("/users/fname/{fname}")
	public List<User> getUserByFirstName(@PathVariable("fname") String fname) {
		return repository.findByFirstName(fname);
	}

	@RequestMapping("/users/lname/{lname}")
	public List<User> getUserByLastName(@PathVariable("lname") String lname) {
		return repository.findByLastName(lname);
	}

	@PostMapping("/users")
	public ResponseEntity<String> addUser(@RequestBody User user) {
		repository.save(user);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@DeleteMapping("/users/{lname}")
	public ResponseEntity<String> deleteUser(@PathVariable String lname) {
		List<User> users = repository.findByLastName(lname);
		if (users.size() == 1) {
			User user = users.get(0);
			repository.delete(user);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
