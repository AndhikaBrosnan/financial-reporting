import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { isMobileHandler } from "../../helpers/responsive";
import DatePicker from "react-datepicker";

import styles from "./styles.module.css";

const FinancialReport = () => {
  const isMobile = isMobileHandler();

  return (
    <Box
      m={isMobile ? "0" : "0 25em"}
      p={!isMobile && "2em 1em"}
      h="100vh"
      border="1px solid #ffffff"
      borderRadius="4px"
      background="white"
    >
      <Flex
        justifyContent={isMobile ? "space-between" : "space-around"}
        alignItems={"center"}
        w="100%"
        mt={"1em"}
      >
        <Box ml={"3em"} p="1em" background="teal" borderRadius="28px">
          <Text color={"white"}>Uang Masuk</Text>
        </Box>
        <Box mr={"3em"} p="1em" background="blue" borderRadius="28px">
          <Text color={"white"}>Uang Keluar</Text>
        </Box>
      </Flex>

      <Divider border="2px solid #808080" mt={"2em"} />

      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Keterangan Barang
        </Heading>
        <FormControl m={"1em 0"}>
          <FormLabel>Nama Barang</FormLabel>
          <Input type="text" />
          <FormHelperText>Nama Barang harus unique.</FormHelperText>
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Jumlah Barang</FormLabel>
          <Input type="number" />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Tanggal Transaksi</FormLabel>
          <DatePicker placeholderText="Date Picker" selected={new Date()} />
        </FormControl>

        <Text></Text>
      </Box>
      <Divider border="1px solid #000000" mt={"2em"} />
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Total Pemasukan
        </Heading>
        <Text>Harga Modal</Text>
      </Box>
    </Box>
  );
};

export default FinancialReport;
