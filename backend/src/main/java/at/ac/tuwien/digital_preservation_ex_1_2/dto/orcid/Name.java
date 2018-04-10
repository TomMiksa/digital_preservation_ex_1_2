package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Name {

  @JsonProperty("given-names")
  private GivenName givenNames;

  @JsonProperty("family-name")
  private FamilyName familyName;

  public Name() {
  }

  public GivenName getGivenNames() {
    return givenNames;
  }

  public void setGivenNames(GivenName givenNames) {
    this.givenNames = givenNames;
  }

  public FamilyName getFamilyName() {
    return familyName;
  }

  public void setFamilyName(FamilyName familyName) {
    this.familyName = familyName;
  }
}
