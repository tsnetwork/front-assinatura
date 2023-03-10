import {
  Button,
  Flex,
  Text,
  CloseButton,
  Image,
  Input,
} from "@chakra-ui/react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import Router from "next/router";

const customStyles = {
  content: {},
};

interface ModalImportImageProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalIMportImage({
  isOpen,
  onRequestClose,
}: ModalImportImageProps) {
  const [image, setImage] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState([]);

  const uploadToClient = (event) => {
    console.log("ARQUIVOS", event.target.files);
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files;

      setImage(i);
      //setCreateObjectURL(URL.createObjectURL);
    }
  };

  const uploadToServer = async (event) => {
    console.log("IBAGENS", image);
    const body = new FormData();

    const file = [...image];

    file.map((f) => {
      console.log("F", f);
      body.append("file", f);
    });

    console.log("Body", body);

    api.post("/file", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onRequestClose();
  };

  const reload = () => window.location.reload();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customStyles}
      onAfterClose={reload}
    >
      <Flex as="div" direction="column" h="100%">
        <Flex h="8" w="100%" justifyContent="right">
          <CloseButton onClick={onRequestClose} />
        </Flex>
        <Flex h="100%" w="100%" direction="column" gap="8" p="8">
          <Text as="b" fontSize="4xl">
            Importar Imagem
          </Text>
          <Flex direction="column">
            <Text as="i" fontSize="2xl">
              Selecione a imagem
            </Text>
            <Input
              type="file"
              name="myImage"
              onChange={uploadToClient}
              multiple
            />
            <Button colorScheme="blue" type="submit" onClick={uploadToServer}>
              Enviar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
}
