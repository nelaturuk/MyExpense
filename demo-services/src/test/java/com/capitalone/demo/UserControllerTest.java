package com.capitalone.demo;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.capitalone.demo.domain.User;
import com.capitalone.demo.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {
	@Autowired
	private UserRepository userRepository;
	
	@Test
    public void testFindByName() {
		User u = new User();
		u.firstName = "Test FName";
		u.lastName = "Test LName";
		u.email = "nelaturuk1@gmail.com";
		u.password = "test";
		userRepository.save(u);
		List<User> result = userRepository.findByFirstName(u.firstName);
        assertNotEquals(0, result.size());
    }
}
