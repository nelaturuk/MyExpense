package com.capitalone.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.capitalone.demo.domain.Colleague;

import java.util.List;

public interface ColleagueRepository extends MongoRepository<Colleague, String> {

    public List<Colleague> findByName(String name);

}