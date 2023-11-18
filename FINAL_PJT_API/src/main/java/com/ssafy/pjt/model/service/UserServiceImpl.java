package com.ssafy.pjt.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.pjt.model.dao.UserDao;
import com.ssafy.pjt.model.dto.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;

	@Override
	public List<User> getAllUser() {
		return userDao.selectAllUser();
	}

	@Override
	public int addUser(User user) {
		return userDao.insertUser(user);
	}

	@Override
	public int modifyUser(User user) {
		return userDao.updateUser(user);
	}

	@Override
	public int removeUser(String userId) {
		return userDao.deleteUser(userId);
	}

	@Override
	public User getOneUser(String userId) {
		return userDao.selectOneUser(userId);
	}

	@Override
	public int modifyAvty(User user) {
		return userDao.updateAvty(user);
	}

}
