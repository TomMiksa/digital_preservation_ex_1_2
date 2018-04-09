package at.ac.tuwien.digital_preservation_ex_1_2.service.impl;

import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidRecordResponse;
import at.ac.tuwien.digital_preservation_ex_1_2.dto.OrcidTokenResponse;
import at.ac.tuwien.digital_preservation_ex_1_2.entity.User;
import at.ac.tuwien.digital_preservation_ex_1_2.repository.UserRepository;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IOrcidService;
import at.ac.tuwien.digital_preservation_ex_1_2.service.IUserService;
import java.net.URI;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

  @Autowired
  private IUserService userService;

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

    OrcidTokenResponse orcidTokenResponse =
        restTemplate.postForObject(uri, null, OrcidTokenResponse.class);

    User user = new User(orcidTokenResponse.getOrcid(), orcidTokenResponse.getAccessToken());
    userService.update(user);

    return orcidTokenResponse;

  }

  @Override
  public OrcidRecordResponse getRecord(String orcid) {

    URI uri = UriComponentsBuilder.newInstance()
        .scheme("https").host("pub.orcid.org")
        .path("/v2.1/{orcid}/person")
        .buildAndExpand(orcid)
        .encode()
        .toUri();

    String access_token = userService.findByOrcid(orcid).getAccessToken();

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(new MediaType[] { MediaType.APPLICATION_JSON }));
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + access_token);

    HttpEntity<String> entityReq = new HttpEntity<>(null, headers);

    ResponseEntity<String> respEntity = restTemplate
        .exchange(uri, HttpMethod.GET, entityReq, String.class);

    System.out.println(respEntity.getBody());

    return null;

  }

}
