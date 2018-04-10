package at.ac.tuwien.digital_preservation_ex_1_2.service;

import at.ac.tuwien.digital_preservation_ex_1_2.entity.User;

public interface IUserService extends IDAOService<User, Integer> {

  User findByOrcid(String orcid);

}
