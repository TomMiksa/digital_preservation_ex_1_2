package at.ac.tuwien.digital_preservation_ex_1_2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AdministrativeData {

  @JsonProperty("orcid")
  private String orcid;

  @JsonProperty("family_name")
  private String familyName;

  @JsonProperty("given_name")
  private String givenName;

  @JsonProperty("email")
  private String email;

  @JsonProperty("country")
  private String country;

  @JsonProperty("project_title")
  private String projectTitle;

  public AdministrativeData() {
  }

  public String getOrcid() {
    return orcid;
  }

  public void setOrcid(String orcid) {
    this.orcid = orcid;
  }

  public String getFamilyName() {
    return familyName;
  }

  public void setFamilyName(String familyName) {
    this.familyName = familyName;
  }

  public String getGivenName() {
    return givenName;
  }

  public void setGivenName(String givenName) {
    this.givenName = givenName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getProjectTitle() {
    return projectTitle;
  }

  public void setProjectTitle(String projectTitle) {
    this.projectTitle = projectTitle;
  }

  @Override
  public String toString() {
    final StringBuffer sb = new StringBuffer("AdministrativeData{");
    sb.append("orcid='").append(orcid).append('\'');
    sb.append(", familyName='").append(familyName).append('\'');
    sb.append(", givenName='").append(givenName).append('\'');
    sb.append(", email='").append(email).append('\'');
    sb.append(", country='").append(country).append('\'');
    sb.append(", projectTitle='").append(projectTitle).append('\'');
    sb.append('}');
    return sb.toString();
  }
}
