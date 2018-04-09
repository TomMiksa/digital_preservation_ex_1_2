package at.ac.tuwien.digital_preservation_ex_1_2.service;

import java.util.List;

public interface IDAOService<T, S> {

  /**
   * Saves an valid entity.
   *
   * @param t the entity, which should get saved.
   * @return the saved entity.
   */
  T save(T t);

  /**
   * Updates an valid entity
   *
   * @param t the entity, which should get saved.
   */
  void update(T t);

  /**
   * Deletes an entity.
   *
   * @param s the entity, which should get deleted.
   */
  void delete(S s);

  /**
   * Finds an entity, with the specific key.
   *
   * @param s the key, of the entity which is searched.
   * @return the found entity
   */
  T findOne(S s);

  /**
   * Finds all persistent entities.
   *
   * @return all persistent entities
   */
  List<T> findAll();

}
