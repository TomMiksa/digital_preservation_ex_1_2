package at.ac.tuwien.digital_preservation_ex_1_2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Address {

  @JsonProperty("country")
  private JsonNode country;

  public Address() {
  }

  public JsonNode getCountry() {
    return country;
  }

  public void setCountry(JsonNode country) {
    this.country = country;
  }
}
