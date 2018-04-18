package at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Works {

  @JsonProperty("group")
  private List<GroupedWorks> groupedWorksList;

  public Works() {
  }

  public List<GroupedWorks> getGroupedWorksList() {
    return groupedWorksList;
  }

  public void setGroupedWorksList(
      List<GroupedWorks> groupedWorksList) {
    this.groupedWorksList = groupedWorksList;
  }

}
