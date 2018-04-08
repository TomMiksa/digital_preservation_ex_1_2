package at.ac.tuwien.digital_preservation_ex_1_2.service;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidTokenResponse;
import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OrcidService implements IOrcidService {

  @Value("${spring.orcid.clientId}")
  private String clientId;

  @Value("${spring.orcid.clientSecret}")
  private String clientSecret;

  @Value("${spring.orcid.redirectUri}")
  private String redirectUri;

  @Autowired
  private RestTemplate restTemplate;

  @Override
  public OrcidTokenResponse getToken(String code) {

    URI uri = UriComponentsBuilder.newInstance()
        .scheme("https").host("orcid.org")
        .path("/oauth/token")
        .queryParam("client_id", clientId)
        .queryParam("client_secret", clientSecret)
        .queryParam("grant_type", "authorization_code")
        .queryParam("code", code)
        .queryParam("redirect_uri", redirectUri)
        .build()
        .encode()
        .toUri();

      return restTemplate.postForObject(uri, null, OrcidTokenResponse.class);

    }

}
