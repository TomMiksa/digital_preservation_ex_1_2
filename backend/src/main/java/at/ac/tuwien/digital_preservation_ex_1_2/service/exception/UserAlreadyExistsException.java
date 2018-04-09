package at.ac.tuwien.digital_preservation_ex_1_2.service.exception;

public class UserAlreadyExistsException extends ServiceException {

  public UserAlreadyExistsException() {
  }

  public UserAlreadyExistsException(String message) {
    super(message);
  }

  public UserAlreadyExistsException(String message, Exception e) {
    super(message, e);
  }

}
