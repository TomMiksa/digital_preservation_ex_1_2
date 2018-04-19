package at.ac.tuwien.digital_preservation_ex_1_2.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ZenodoController {

  private final RestTemplate restTemplate;

  public ZenodoController(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @GetMapping("/zenodo/{doi}")
  public String getDoiMetaData(@PathVariable String doi) {

    final String url =
            "https://zenodo.org/oai2d?verb=GetRecord&metadataPrefix=oai_dc&identifier=oai:zenodo.org:"
                    .concat(doi);


    final String result = restTemplate.getForObject(url, String.class);
    return result;
  }
}
