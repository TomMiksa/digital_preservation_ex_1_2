package at.ac.tuwien.digital_preservation_ex_1_2.service;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.AdministrativeData;

public interface IAdministrativeDataService {

  AdministrativeData findData(String orcid);

}
