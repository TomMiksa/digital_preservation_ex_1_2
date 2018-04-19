package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Title {

  @JsonProperty("value")
  private String value;

  public Title() {
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }
}
