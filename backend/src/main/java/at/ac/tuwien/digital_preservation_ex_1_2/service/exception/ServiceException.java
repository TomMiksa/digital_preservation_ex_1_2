package at.ac.tuwien.digital_preservation_ex_1_2.service.exception;

public class ServiceException extends RuntimeException {

  public ServiceException() {
  }

  public ServiceException(String message) {
    super(message);
  }

  public ServiceException(String message, Exception e) {
    super(message, e);
  }

}
