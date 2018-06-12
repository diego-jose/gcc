package gestao.service;

import gestao.service.dto.PessoaDTO;
import java.util.List;

/**
 * Service Interface for managing Pessoa.
 */
public interface PessoaService {

    /**
     * Save a pessoa.
     *
     * @param pessoaDTO the entity to save
     * @return the persisted entity
     */
    PessoaDTO save(PessoaDTO pessoaDTO);

    /**
     * Get all the pessoas.
     *
     * @return the list of entities
     */
    List<PessoaDTO> findAll();

    /**
     * Get the "id" pessoa.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PessoaDTO findOne(Long id);

    /**
     * Delete the "id" pessoa.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
