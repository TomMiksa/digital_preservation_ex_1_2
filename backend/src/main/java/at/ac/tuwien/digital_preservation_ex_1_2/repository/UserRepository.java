package at.ac.tuwien.digital_preservation_ex_1_2.repository;

import at.ac.tuwien.digital_preservation_ex_1_2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  User findByOrcid(String orcid);

}
