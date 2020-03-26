import { Box, BoxProps } from "@chakra-ui/core";
import React from "react";

const Container: React.FC<BoxProps> = props => {
  return <Box width={["90%", "90%", "768px", "1180px"]} mx="auto" {...props} />;
};

export default Container;
