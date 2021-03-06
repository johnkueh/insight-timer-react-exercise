import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  PseudoBox,
  Spinner
} from "@chakra-ui/core";
import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import Photo from "../components/Photo";
import { useAlbum } from "../data/api";

interface Props {}

const Album: React.FC<Props> = () => {
  const { albumId } = useParams();
  const data = useAlbum(albumId!);
  const [{ selected, hidden }, dispatch] = useReducer(reducer, {
    selected: [],
    hidden: []
  });

  if (data.loading)
    return (
      <Container p={24} width="10rem" mx="auto">
        <Spinner color="brand.purple" />
      </Container>
    );

  if (data.errors.length > 0) {
    return (
      <Container p={24}>
        {data.errors.map(({ name, message }) => {
          return (
            <Alert mb={2} status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{name}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          );
        })}
      </Container>
    );
  }

  const { album, photos } = data;

  return (
    <Container>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt={[10, 10, 20, 20]}
        p={8}
      >
        <Heading size="xl">{album?.title}</Heading>
        <Box ml={3}>
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
        {photos?.map(
          photo =>
            !hidden.includes(photo.id) && (
              <PseudoBox
                key={photo.id}
                textAlign="left"
                shadow="none"
                outline="none"
                width={["100%", "100%", "50%", "33.333%"]}
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
        {photos?.length === hidden.length && <Box p={4}>No photos</Box>}
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
