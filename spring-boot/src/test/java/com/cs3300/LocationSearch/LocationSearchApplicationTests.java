package com.cs3300.LocationSearch;

import com.cs3300.LocationSearch.entities.User;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class LocationSearchApplicationTests extends AbstractTest {

	User user;

	@Override
	@Before
	public void setUp(){
		super.setUp();
		user = new User("yeet", "a", "b", "b");
	}
	@Test
	public void usernameTests() {
		User test = new User("user1", "a", "b", "abc123");
		assert(test.getUsername().equals("user1"));
	}

	@Test
	public void passwordTests() {
		User test = new User("user1", "a", "b", "abc123");
		assert(test.getPassword().equals("abc123"));
	}

	@Test
	public void updatePasswordTests() {
		User test = new User("user1", "a", "b", "abc123");
		test.setPassword("def123");
		assert(test.getPassword().equals("def123"));
	}

	@Test
	public void checkId() {
		User test = new User("user1", "a", "b", "abc123");
		assert(test.getId() != null);
	}

	@Test
	public void createUser() throws Exception {
		String uri = "/create?username=yeet&firstName=a&lastName=b&password=b";

		String inputJson = super.mapToJson(user);
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		assertEquals("User with username " + user.getUsername() + " has been added.", content);
	}

	@Test
	public void deleteUser() throws Exception {
		String uri = "/delete/yeet";
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		assertEquals(content, "User with username " + user.getUsername() + " has been deleted.");
	}

	@Test
	public void updateProduct() throws Exception {
		String uri = "/update/user1";
		User newPass = new User("user1", "a", "b", "newPass");
		String inputJson = super.mapToJson(newPass);
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE)
				.content(inputJson)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		assertEquals("User with username " + "user1" + " has been updated.", content);
	}


}
