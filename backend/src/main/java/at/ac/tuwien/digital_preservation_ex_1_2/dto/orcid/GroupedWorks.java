package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GroupedWorks {

  @JsonProperty("work-summary")
  private List<Work> workList;

  public GroupedWorks() {
  }

  public List<Work> getWorkList() {
    return workList;
  }

  public void setWorkList(List<Work> workList) {
    this.workList = workList;
  }
}
