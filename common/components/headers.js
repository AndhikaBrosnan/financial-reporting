import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isMobileHandler } from "../helpers/responsive";

const HeaderLayout = (props) => {
  const { title } = props;
  const isMobile = isMobileHandler();
  const router = useRouter();

  return (
    <Flex
      m="0 8px 4px"
      w="100%"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Box>
        {isMobile && (
          <IconButton
            onClick={() => router.push("/")}
            variant="outline"
            size="24px"
            aria-label="Back"
            icon={<ArrowBackIcon />}
          />
        )}
      </Box>
      <Box ml={"2em"}>{title}</Box>
    </Flex>
  );
};

export default HeaderLayout;
