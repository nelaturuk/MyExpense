package com.capitalone.demo.domain;

import java.util.Date;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Expense {
	
	@Id
    public String id;
	
	public User user;
	public String type;
	public int amount;
	public Date expenseDate;
	public Date createdDate;
	public Date updatedDate;
	
	public Expense() {
		
	}
	
	public Expense(User user, String type, int amount, Date expenseDate){
		this.user = user;
		this.type = type;
		this.amount = amount;
		this.expenseDate = expenseDate;
		this.createdDate = new Date();
		this.updatedDate = new Date();
	}
	
	@Override
    public String toString() {
        return "Expense{" +
                ", user='" + user.id + '\'' +
                ", type='" + type + '\'' +
                ", amount='" + amount + '\'' +
                ", expenseDate='" + expenseDate + '\'' + 
                ", createdDate='" + createdDate + '\'' + 
                ", updatedDate='" + updatedDate + '\'' + 
                '}';
    }


}
