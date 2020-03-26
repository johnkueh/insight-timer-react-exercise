import { Box, Flex, Icon, Image, PseudoBox } from "@chakra-ui/core";
import React from "react";
import { Photo as IPhoto } from "../data/api";

const Photo: React.FC<IPhoto & { selected: boolean }> = ({
  id,
  title,
  thumbnail,
  selected
}) => {
  return (
    <PseudoBox
      px={3}
      borderColor="transparent"
      borderWidth="2px"
      _hover={{
        bg: "white",
        borderColor: "borders.gray"
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box width="60px">
          <Image minWidth="60px" height="60px" src={thumbnail} />
        </Box>
        <PseudoBox p={4} fontWeight="semibold" fontSize="md">
          {title}
        </PseudoBox>
        <Box minWidth="40px" width="40px">
          {selected && (
            <Icon
              color="gray.600"
              fontSize="3xl"
              fontWeight="semibold"
              name="check"
            />
          )}
        </Box>
      </Flex>
    </PseudoBox>
  );
};

export default Photo;
