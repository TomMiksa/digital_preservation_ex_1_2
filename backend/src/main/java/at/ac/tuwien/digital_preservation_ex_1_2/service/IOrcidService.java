package at.ac.tuwien.digital_preservation_ex_1_2.service;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.OrcidRecord;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.orcid.OrcidToken;

public interface IOrcidService {

  OrcidToken getToken(String code);

  OrcidRecord getRecord(String orcid);

}
