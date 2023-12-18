import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalCrud from "./components/ModalCrud";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    const db_customer = localStorage.getItem("cadastra_prod")
      ? JSON.parse(localStorage.getItem("cadastra_prod"))
      : [];
    setData(db_customer);
  }, []);

  const handleEdit = (item) => {
    setDataEdit(item);
    onOpen();
  };

  const handleRemove = (codigo) => {
    const newArray = data.filter((item) => item.codigo !== codigo);
    setData(newArray);
    localStorage.setItem("cadastra_prod", JSON.stringify(newArray));
  };

  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      minH="100vh"
      p={4}
      fontFamily="Poppins, sans-serif"
      bg="gray.50"
    >
      <Heading as="h1" size="xl" my={6}>
        Nunes Sports
      </Heading>

      <Button colorScheme="blue" onClick={() => { setDataEdit({}); onOpen(); }} my={4}>
        Cadastrar produto
      </Button>

      <Box width={["95%", "80%", "800px"]} overflowX="auto" boxShadow="md" bg="white" p={6} borderRadius="md">
        <Table mt={4} size="sm">
          <Thead>
            <Tr>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Valor</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.codigo}>
                <Td>{item.codigo}</Td>
                <Td>{item.nome}</Td>
                <Td style={{ maxWidth: "150px", overflowY: "auto" }}>
                  {item.descricao}
                </Td>
                <Td>{item.valor}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => handleEdit(item)}
                    aria-label="Editar produto"
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleRemove(item.codigo)}
                    aria-label="Remover produto"
                    size="sm"
                    colorScheme="red"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {isOpen && (
        <ModalCrud
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
      />
      )}
    </Flex>
  );
};

export default App;
