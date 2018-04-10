package at.ac.tuwien.digital_preservation_ex_1_2.service.impl;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.AdministrativeData;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.mapper.impl.AdministrativeDataMapper;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IAdministrativeDataService;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IOrcidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministrativeDataService implements IAdministrativeDataService {

  @Autowired
  private IOrcidService orcidService;

  @Autowired
  private AdministrativeDataMapper administrativeDataMapper;

  @Override
  public AdministrativeData findData(String orcid) {
    return administrativeDataMapper.fromDTO(orcidService.getRecord(orcid));
  }
}
