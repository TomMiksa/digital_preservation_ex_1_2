package at.ac.tuwien.digital_preservation_ex_1_2.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrcidToken {

  @JsonProperty("access_token")
  private String accessToken;

  @JsonProperty("token_type")
  private String tokenType;

  @JsonProperty("refresh_token")
  private String refreshToken;

  @JsonProperty("expires_in")
  private Long expiresIn;

  @JsonProperty("scope")
  private String scope;

  @JsonProperty("name")
  private String name;

  @JsonProperty("orcid")
  private String orcid;

  public OrcidToken() {
  }

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  public String getTokenType() {
    return tokenType;
  }

  public void setTokenType(String tokenType) {
    this.tokenType = tokenType;
  }

  public String getRefreshToken() {
    return refreshToken;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }

  public Long getExpiresIn() {
    return expiresIn;
  }

  public void setExpiresIn(Long expiresIn) {
    this.expiresIn = expiresIn;
  }

  public String getScope() {
    return scope;
  }

  public void setScope(String scope) {
    this.scope = scope;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getOrcid() {
    return orcid;
  }

  public void setOrcid(String orcid) {
    this.orcid = orcid;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    OrcidToken that = (OrcidToken) o;
    return Objects.equals(accessToken, that.accessToken) &&
        Objects.equals(tokenType, that.tokenType) &&
        Objects.equals(refreshToken, that.refreshToken) &&
        Objects.equals(expiresIn, that.expiresIn) &&
        Objects.equals(scope, that.scope) &&
        Objects.equals(name, that.name) &&
        Objects.equals(orcid, that.orcid);
  }

  @Override
  public int hashCode() {

    return Objects.hash(accessToken, tokenType, refreshToken, expiresIn, scope, name, orcid);
  }

  @Override
  public String toString() {
    return "OrcidToken{" +
        "accessToken='" + accessToken + '\'' +
        ", tokenType='" + tokenType + '\'' +
        ", refreshToken='" + refreshToken + '\'' +
        ", expiresIn=" + expiresIn +
        ", scope='" + scope + '\'' +
        ", name='" + name + '\'' +
        ", orcid='" + orcid + '\'' +
        '}';
  }
}
