package at.ac.tuwien.digital_preservation_ex_1_2.web;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidRecord;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidToken;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IOrcidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class OrcidController {

  @Autowired
  private IOrcidService orcidService;

  @PostMapping("/auth")
  public OrcidToken getToken(@RequestParam String code) {
    return orcidService.getToken(code);
  }

  @GetMapping("/record/{orcid}")
  public OrcidRecord getRecord(@PathVariable String orcid) {
    return orcidService.getRecord(orcid);
  }

}
