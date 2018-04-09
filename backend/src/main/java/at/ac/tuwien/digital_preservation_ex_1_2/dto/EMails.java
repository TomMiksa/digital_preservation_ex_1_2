package at.ac.tuwien.digital_preservation_ex_1_2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EMails {

  @JsonProperty("email")
  private List<EMail> emails;

  public EMails() {
  }

  public List<EMail> getEmails() {
    return emails;
  }

  public void setEmails(List<EMail> emails) {
    this.emails = emails;
  }

}
