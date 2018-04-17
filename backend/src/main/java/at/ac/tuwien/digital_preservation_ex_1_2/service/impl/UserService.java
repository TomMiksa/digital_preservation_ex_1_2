package at.ac.tuwien.digital_preservation_ex_1_2.service.impl;

import at.ac.tuwien.digital_preservation_ex_1_2.entity.User;
import at.ac.tuwien.digital_preservation_ex_1_2.repository.UserRepository;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IUserService;
import at.ac.tuwien.digital_preservation_ex_1_2.service.exception.UserAlreadyExistsException;
import at.ac.tuwien.digital_preservation_ex_1_2.service.exception.UserNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public User save(User user) {

    if (!(userRepository.findByOrcid(user.getOrcid()) == null)) {
      throw new UserAlreadyExistsException("The specified "
          + "user(" + user.getOrcid() + ") already exists");
    }

    return userRepository.save(user);

  }

  @Override
  public void update(User user) {

    User updatedUser;

    try {
      updatedUser = findByOrcid(user.getOrcid());
    } catch (UserNotFoundException e) {
      save(user);
      return;
    }

    updatedUser.setAccessToken(user.getAccessToken());
    userRepository.save(updatedUser);

  }

  @Override
  public void delete(Integer integer) {
    throw new UnsupportedOperationException();
  }

  @Override
  public User findOne(Integer id) {
    throw new UnsupportedOperationException();
  }

  @Override
  public List<User> findAll() {
    throw new UnsupportedOperationException();
  }

  @Override
  public User findByOrcid(String orcid) {

    User user = userRepository.findByOrcid(orcid);

    if (user == null) {
      throw new UserNotFoundException("The specified user(" + orcid + ") doesn't exist.");
    }

    return user;

  }
}
