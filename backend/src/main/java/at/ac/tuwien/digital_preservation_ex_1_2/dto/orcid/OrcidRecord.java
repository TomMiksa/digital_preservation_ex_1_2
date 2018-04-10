package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrcidRecord {

  @JsonProperty("orcid-identifier")
  private OrcidIdentifier orcidIdentifier;

  @JsonProperty("person")
  private Person person;

  public OrcidRecord() {
  }

  public OrcidIdentifier getOrcidIdentifier() {
    return orcidIdentifier;
  }

  public void setOrcidIdentifier(
      OrcidIdentifier orcidIdentifier) {
    this.orcidIdentifier = orcidIdentifier;
  }

  public Person getPerson() {
    return person;
  }

  public void setPerson(Person person) {
    this.person = person;
  }

}
