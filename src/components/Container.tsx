import { Box, BoxProps } from "@chakra-ui/core";
import React from "react";

const Container: React.FC<BoxProps> = props => {
  return (
    <Box width={["100%", "100%", "768px", "1180px"]} mx="auto" {...props} />
  );
};

export default Container;
