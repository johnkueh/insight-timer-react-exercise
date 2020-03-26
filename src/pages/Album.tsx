import { Box, Button, Flex, Heading, PseudoBox } from "@chakra-ui/core";
import React, { useReducer } from "react";
import Container from "../components/Container";
import Photo from "../components/Photo";
import { album, photos } from "../data/api";

interface Props {}

const Album: React.FC<Props> = () => {
  const [{ selected, hidden }, dispatch] = useReducer(reducer, {
    selected: [],
    hidden: []
  });

  return (
    <Container>
      <Flex alignItems="center" justifyContent="space-between" mt={20} p={8}>
        <Heading size="xl">{album.title}</Heading>
        <Box>
          <Button
            mr={2}
            variant="ghost"
            size="sm"
            onClick={() => {
              dispatch({ type: "reset" });
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            color="white"
            bg="brand.purple"
            _hover={{ bg: "brand.purpleDarker" }}
            onClick={() => {
              dispatch({ type: "hide" });
            }}
          >
            Hide
          </Button>
        </Box>
      </Flex>
      <Flex p={5} flexWrap="wrap" bg="backgrounds.gray">
        {photos.map(
          photo =>
            !hidden.includes(photo.id) && (
              <PseudoBox
                key={photo.id}
                textAlign="left"
                shadow="none"
                outline="none"
                width="33.333%"
                as="button"
                onClick={() => {
                  dispatch({
                    type: "toggleSelect",
                    id: photo.id
                  });
                }}
              >
                <Photo {...photo} selected={selected.includes(photo.id)} />
              </PseudoBox>
            )
        )}
        {photos.length === hidden.length && <Box>No photos</Box>}
      </Flex>
    </Container>
  );
};

type State = {
  selected: string[];
  hidden: string[];
};

type Action =
  | {
      type: "toggleSelect";
      id: string;
    }
  | {
      type: "hide";
    }
  | {
      type: "reset";
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "toggleSelect":
      const id = action.id;
      const selected = state.selected.includes(id);
      let selectedIds = [...state.selected, id];

      if (selected) {
        selectedIds = state.selected.filter(selectedId => selectedId !== id);
      }

      return {
        ...state,
        selected: selectedIds
      };
    case "hide":
      return {
        selected: [],
        hidden: [...state.hidden, ...state.selected]
      };
    case "reset":
      return {
        selected: [],
        hidden: []
      };
    default:
      return state;
  }
}

export default Album;
