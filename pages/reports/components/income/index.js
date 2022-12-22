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
import styles from "./styles.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const IncomeComponent = () => {
  const [incomeDate, setIncomeDate] = useState(new Date());

  return (
    <>
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Keterangan Barang
        </Heading>
        <FormControl m={"1em 0"}>
          <FormLabel>Nama Barang</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Jumlah Barang</FormLabel>
          <Input type="number" />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Tanggal Transaksi</FormLabel>
        </FormControl>
        <DatePicker
          placeholderText="Date Picker"
          selected={incomeDate}
          onChange={(date) => setIncomeDate(date)}
        />
      </Box>
      <Divider border="1px solid #000000" mt={"2em"} />
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Total Pemasukan
        </Heading>
        <Flex justifyContent="flex-start" alignItems="center">
          <Text>Harga Modal</Text>{" "}
          <Text ml="7em" fontWeight="500">
            Rp. 0
          </Text>
        </Flex>
        <Heading as="h4" size="md" mt={"2em"}>
          Keutungan
        </Heading>
      </Box>
    </>
  );
};

export default IncomeComponent;
