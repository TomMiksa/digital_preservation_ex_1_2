package at.ac.tuwien.digital_preservation_ex_1_2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Name {

  @JsonProperty("given-names")
  private JsonNode givenNames;

  @JsonProperty("family-name")
  private JsonNode familyName;

  public Name() {
  }

  public JsonNode getFamilyName() {
    return familyName;
  }

  public void setFamilyName(JsonNode familyName) {
    this.familyName = familyName;
  }

  public JsonNode getGivenNames() {
    return givenNames;
  }

  public void setGivenNames(JsonNode givenNames) {
    this.givenNames = givenNames;
  }

}
