package com.capitalone.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.capitalone.demo.domain.Expense;
import com.capitalone.demo.domain.User;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
	
	public List<Expense> findById(String id);
    public List<Expense> findByUser(User user);
    public List<Expense> findByType(String type);
    public List<Expense> findByExpenseDate(Date expenseDate);

}
