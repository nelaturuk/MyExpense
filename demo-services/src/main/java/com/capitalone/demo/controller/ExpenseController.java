package com.capitalone.demo.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capitalone.demo.domain.Expense;
import com.capitalone.demo.domain.User;
import com.capitalone.demo.repository.ExpenseRepository;
import com.capitalone.demo.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class ExpenseController {
	@Autowired
	private ExpenseRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping("/expenses/user/{userid}")
	public List<Expense> getExpenseByUser(@PathVariable("userid") String userid) {
		User user = userRepository.findById(userid);
		if(user != null){
			return repository.findByUser(user);
		}
		return null;
	}
	
	@RequestMapping("/expenses/type/{type}")
	public List<Expense> getExpenseByType(@PathVariable("type") String type) {
		return repository.findByType(type);
	}
	
	@RequestMapping("/expenses/date/{date}")
	public List<Expense> getExpenseByType(@PathVariable("date") Date date) {
		return repository.findByExpenseDate(date);
	}

	@PostMapping("/expenses")
	public ResponseEntity<String> addExpense(@RequestBody Expense expense) {
		repository.save(expense);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@DeleteMapping("/expenses/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable String id) {
		List<Expense> expenses = repository.findById(id);
		if (expenses.size() == 1) {
			Expense exp = expenses.get(0);
			repository.delete(exp);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
