package at.ac.tuwien.digital_preservation_ex_1_2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Person {

  @JsonProperty("name")
  private Name name;

  @JsonProperty("emails")
  private EMails emails;

  @JsonProperty("addresses")
  private Addresses addresses;

  public Person() {
  }

  public Name getName() {
    return name;
  }

  public void setName(Name name) {
    this.name = name;
  }

  public EMails getEmails() {
    return emails;
  }

  public void setEmails(EMails emails) {
    this.emails = emails;
  }

  public Addresses getAddresses() {
    return addresses;
  }

  public void setAddresses(Addresses addresses) {
    this.addresses = addresses;
  }
}
