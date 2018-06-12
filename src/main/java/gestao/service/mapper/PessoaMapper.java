package gestao.service.mapper;

import gestao.domain.*;
import gestao.service.dto.PessoaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pessoa and its DTO PessoaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PessoaMapper extends EntityMapper<PessoaDTO, Pessoa> {



    default Pessoa fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pessoa pessoa = new Pessoa();
        pessoa.setId(id);
        return pessoa;
    }
}
