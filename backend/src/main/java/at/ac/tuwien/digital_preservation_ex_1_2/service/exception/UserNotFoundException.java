package at.ac.tuwien.digital_preservation_ex_1_2.service.exception;

public class UserNotFoundException extends ServiceException {

  public UserNotFoundException() {
  }

  public UserNotFoundException(String message) {
    super(message);
  }

  public UserNotFoundException(String message, Exception e) {
    super(message, e);
  }

}
