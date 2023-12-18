import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalCrud = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [codigo, setCodigo] = useState(dataEdit.codigo || "");
  const [nome, setNome] = useState(dataEdit.nome || "");
  const [descricao, setDescricao] = useState(dataEdit.descricao || "");
  const [valor, setValor] = useState(dataEdit.valor || "");

  const handleSave = () => {
    if (!nome || !codigo || !descricao || !valor) return;
  
    if (codigoAlreadyExists()) {
      return alert("Código já cadastrado!");
    }
  
    const newItem = { codigo, nome, descricao, valor };
  
    let newDataArray;
    if (Object.keys(dataEdit).length) {
      // Atualiza o item existente
      newDataArray = data.map((item) =>
        item.codigo === dataEdit.codigo ? newItem : item
      );
    } else {
      // Adiciona um novo item
      newDataArray = [...(data || []), newItem];
    }
  
    localStorage.setItem("cadastra_prod", JSON.stringify(newDataArray));
    setData(newDataArray);
    onClose();
  };

  const codigoAlreadyExists = () => {
    if (dataEdit.codigo !== codigo && data?.length) {
      return data.find((item) => item.codigo === codigo);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Produtos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Código</FormLabel>
                <Input
                  type="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Descrição</FormLabel>
                <Input
                  type="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Valor</FormLabel>
                <Input
                  type="valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </Box>

            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              CONFIRMAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCrud;