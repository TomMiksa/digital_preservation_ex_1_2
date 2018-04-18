package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Activities {

  @JsonProperty("works")
  private Works works;

  public Activities() {
  }

  public Works getWorks() {
    return works;
  }

  public void setWorks(Works works) {
    this.works = works;
  }
}
