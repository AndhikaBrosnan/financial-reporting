import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isMiniMobileHandler } from "../helpers/responsive";

const HeaderLayout = (props) => {
  const { title } = props;
  const isMobile = isMiniMobileHandler();
  const router = useRouter();

  return (
    <Flex
      p="0 8px 4px"
      w="100%"
      justifyContent="flex-start"
      alignItems="center"
      background="#018062"
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      h="50"
    >
      <Flex justifyContent="flex-start" alignItems="center">
        {isMobile && router.asPath !== "/" && (
          <IconButton
            p={"1em 1em 0.5em"}
            onClick={() => router.push("/")}
            variant="link"
            size="24px"
            color="white"
            aria-label="Back"
            icon={<ArrowBackIcon />}
          />
        )}
        {router.asPath === "/" && (
          <Text color="white">Financial Reporting App</Text>
        )}
      </Flex>
      <Box ml={"2em"}>{title}</Box>
    </Flex>
  );
};

export default HeaderLayout;
