package at.ac.tuwien.digital_preservation_ex_1_2.entity;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

  @Id
  @GeneratedValue
  @Column(name = "user_id")
  private Integer id;

  @Column(name = "orc_id")
  private String orcid;

  @Column(name = "accessToken")
  private String accessToken;

  public User() {
  }

  public User(String orcid, String access_token) {
    this.orcid = orcid;
    this.accessToken = access_token;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getOrcid() {
    return orcid;
  }

  public void setOrcid(String orcid) {
    this.orcid = orcid;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(id, user.id) &&
        Objects.equals(orcid, user.orcid) &&
        Objects.equals(accessToken, user.accessToken);
  }

  @Override
  public int hashCode() {

    return Objects.hash(id, orcid, accessToken);
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", orcid='" + orcid + '\'' +
        ", accessToken='" + accessToken + '\'' +
        '}';
  }
}
