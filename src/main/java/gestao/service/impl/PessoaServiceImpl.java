package gestao.service.impl;

import gestao.service.PessoaService;
import gestao.domain.Pessoa;
import gestao.repository.PessoaRepository;
import gestao.service.dto.PessoaDTO;
import gestao.service.mapper.PessoaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Pessoa.
 */
@Service
@Transactional
public class PessoaServiceImpl implements PessoaService {

    private final Logger log = LoggerFactory.getLogger(PessoaServiceImpl.class);

    private final PessoaRepository pessoaRepository;

    private final PessoaMapper pessoaMapper;

    public PessoaServiceImpl(PessoaRepository pessoaRepository, PessoaMapper pessoaMapper) {
        this.pessoaRepository = pessoaRepository;
        this.pessoaMapper = pessoaMapper;
    }

    /**
     * Save a pessoa.
     *
     * @param pessoaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PessoaDTO save(PessoaDTO pessoaDTO) {
        log.debug("Request to save Pessoa : {}", pessoaDTO);
        Pessoa pessoa = pessoaMapper.toEntity(pessoaDTO);
        pessoa = pessoaRepository.save(pessoa);
        return pessoaMapper.toDto(pessoa);
    }

    /**
     * Get all the pessoas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PessoaDTO> findAll() {
        log.debug("Request to get all Pessoas");
        return pessoaRepository.findAll().stream()
            .map(pessoaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one pessoa by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PessoaDTO findOne(Long id) {
        log.debug("Request to get Pessoa : {}", id);
        Pessoa pessoa = pessoaRepository.findOne(id);
        return pessoaMapper.toDto(pessoa);
    }

    /**
     * Delete the pessoa by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pessoa : {}", id);
        pessoaRepository.delete(id);
    }
}
