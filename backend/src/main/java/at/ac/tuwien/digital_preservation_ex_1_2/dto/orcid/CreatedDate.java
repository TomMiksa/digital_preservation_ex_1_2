package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CreatedDate {

  @JsonProperty("value")
  private Long value;

  public CreatedDate() {
  }

  public Long getValue() {
    return value;
  }

  public void setValue(Long value) {
    this.value = value;
  }

}
