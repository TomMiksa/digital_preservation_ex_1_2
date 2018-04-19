package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Work {

  @JsonProperty("title")
  private Titles titles;

  @JsonProperty("created-date")
  private CreatedDate createdDate;

  public Work() {
  }

  public Titles getTitles() {
    return titles;
  }

  public void setTitles(Titles titles) {
    this.titles = titles;
  }

  public CreatedDate getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(CreatedDate createdDate) {
    this.createdDate = createdDate;
  }
}
