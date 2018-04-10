package at.ac.tuwien.digital_preservation_ex_1_2.web;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.AdministrativeData;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IAdministrativeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdministrativeDataController {

  @Autowired
  IAdministrativeDataService administrativeDataService;

  @GetMapping("/administrative/{orcid}")
  public AdministrativeData getRecord(@PathVariable String orcid) {
    return administrativeDataService.findData(orcid);
  }

}
