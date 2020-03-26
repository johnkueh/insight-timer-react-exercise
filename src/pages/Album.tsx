import { Button, Flex, Heading, PseudoBox } from "@chakra-ui/core";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Photo from "../components/Photo";
import { album, photos } from "../data/api";

interface Props {}

const Album: React.FC<Props> = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSelected = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        return setSelected(selected.filter(selectedId => selectedId !== id));
      }

      return setSelected([...selected, id]);
    },
    [selected]
  );

  return (
    <Container>
      <Flex alignItems="center" justifyContent="space-between" mt={20} p={8}>
        <Heading size="xl">{album.title}</Heading>
        <Button
          size="sm"
          color="white"
          bg="brand.purple"
          _hover={{ bg: "brand.purpleDarker" }}
        >
          Hide
        </Button>
      </Flex>
      <Flex
        p={5}
        justifyContent="space-between"
        flexWrap="wrap"
        bg="backgrounds.gray"
      >
        {photos.map(photo => (
          <PseudoBox
            key={photo.id}
            textAlign="left"
            shadow="none"
            outline="none"
            width="33.333%"
            as="button"
            onClick={() => {
              toggleSelected(photo.id);
            }}
          >
            <Photo {...photo} selected={selected.includes(photo.id)} />
          </PseudoBox>
        ))}
      </Flex>
    </Container>
  );
};

export default Album;
