package at.ac.tuwien.digital_preservation_ex_1_2.dto.mapper;

public interface IDTOMapper<T, F> {

  T fromDTO(F dto);

}
