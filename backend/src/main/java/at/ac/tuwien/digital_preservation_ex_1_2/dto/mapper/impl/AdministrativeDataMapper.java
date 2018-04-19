package at.ac.tuwien.digital_preservation_ex_1_2.dto.mapper.impl;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.AdministrativeData;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.mapper.IDTOMapper;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Activities;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Address;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Addresses;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Country;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.CreatedDate;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.EMail;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.EMails;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.FamilyName;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.GivenName;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.GroupedWorks;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Name;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.OrcidIdentifier;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.OrcidRecord;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Person;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Title;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Titles;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Work;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.Works;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class AdministrativeDataMapper implements IDTOMapper<AdministrativeData, OrcidRecord> {

  @Override
  public AdministrativeData fromDTO(OrcidRecord dto) {

    AdministrativeData administrativeData = new AdministrativeData();
    administrativeData.setOrcid(getOrcid(dto));
    administrativeData.setFamilyName(getFamilyName(dto));
    administrativeData.setGivenName(getGivenName(dto));
    administrativeData.setEmail(getEmail(dto));
    administrativeData.setCountry(getCountry(dto));
    administrativeData.setProjectTitle(getTitle(dto));

    return administrativeData;
  }

  private String getOrcid(OrcidRecord dto) {

    OrcidIdentifier orcidIdentifier = dto.getOrcidIdentifier();

    if (orcidIdentifier == null) {
      return null;
    }

    return orcidIdentifier.getUri();
  }

  private Name getName(OrcidRecord dto) {

    Person person = dto.getPerson();

    if (person == null) {
      return null;
    }

    Name name = person.getName();

    if (name == null) {
      return null;
    }

    return name;

  }

  private String getFamilyName(OrcidRecord dto) {

    Name name = getName(dto);

    if (name == null) {
      return null;
    }

    FamilyName familyName = name.getFamilyName();

    if (familyName == null) {
      return null;
    }

    return familyName.getValue();
  }

  private String getGivenName(OrcidRecord dto) {

    Name name = getName(dto);

    if (name == null) {
      return null;
    }

    GivenName givenName = name.getGivenNames();

    if (givenName == null) {
      return null;
    }

    return givenName.getValue();
  }

  private String getEmail(OrcidRecord dto) {
    Person person = dto.getPerson();

    if (person == null) {
      return null;
    }

    EMails eMails = person.getEmails();

    if (eMails == null) {
      return null;
    }

    List<EMail> eMailList = eMails.getEmails();

    if (eMailList == null || eMailList.isEmpty()) {
      return null;
    }

    return eMailList.get(0).getEmail();
  }

  private String getCountry(OrcidRecord dto) {
    Person person = dto.getPerson();

    if (person == null) {
      return null;
    }

    Addresses addresses = person.getAddresses();

    if (addresses == null) {
      return null;
    }

    List<Address> addressList = addresses.getAddresses();

    if (addressList == null || addressList.isEmpty()) {
      return null;
    }

    Country country = addressList.get(0).getCountry();

    if (country == null) {
      return null;
    }

    return country.getValue();
  }

  private String getTitle(OrcidRecord dto){

    Activities activities = dto.getActivities();
    if(activities == null){
      return null;
    }

    Works works = activities.getWorks();
    if(works == null){
      return null;
    }

    List<GroupedWorks> groupedWorksList = works.getGroupedWorksList();
    if (groupedWorksList == null || groupedWorksList.isEmpty()) {
      return null;
    }

    Work latestWork = null;
    for(GroupedWorks groupedWorks: groupedWorksList){

      List<Work> workList = groupedWorks.getWorkList();
      if (workList == null || workList.isEmpty()) {
        return null;
      }

      Work work = workList.get(0);
      if(latestWork == null) {
        latestWork = work;
      }

      CreatedDate workDate = work.getCreatedDate();
      CreatedDate latestWorkDate = latestWork.getCreatedDate();
      if(workDate == null || latestWorkDate == null){
        return null;
      }
      if(workDate.getValue() > latestWorkDate.getValue()){
        latestWork = work;
      }
    }

    if(latestWork == null){
      return null;
    }

    Titles titles = latestWork.getTitles();
    if(titles == null){
      return null;
    }

    Title title = titles.getTitle();
    if(title == null){
      return null;
    }

    return title.getValue();
  }

}
