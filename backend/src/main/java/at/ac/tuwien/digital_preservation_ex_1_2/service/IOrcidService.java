package at.ac.tuwien.digital_preservation_ex_1_2.service;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidRecordResponse;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidTokenResponse;

public interface IOrcidService {

  OrcidTokenResponse getToken(String code);

  OrcidRecordResponse getRecord(String orcid);

}
