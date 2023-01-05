import {
  Box,
  Divider,
  Flex,
  FormControl,
  Button,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import styles from "./styles.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { isMiniMobileHandler } from "../../../../common/helpers/responsive";
import { isEmpty, set } from "lodash";

const IncomeComponent = () => {
  const formatter = new Intl.NumberFormat("id-ID");
  const isMobile = isMiniMobileHandler();
  const toast = useToast();

  const [jenisTransaksi, setJenisTransaksi] = useState("");
  const [namaTransaksi, setNamaTransaksi] = useState("");
  const [nominalTransaksi, setNominalTransaksi] = useState(null);
  const [tanggalTransaksi, setTanggalTransaksi] = useState(
    new Date().getTime()
  );
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const options = [
    { value: "penjualan", label: "Penjualan" },
    { value: "penambahan modal", label: "Penambahan modal" },
    { value: "pendapatan di luar usaha", label: "Pendapatan di luar usaha" },
    { value: "pendapatan jasa", label: "Pendapatan jasa" },
    { value: "terima pinjaman", label: "Terima pinjaman" },
    { value: "penagihan utang/cicilan", label: "Penagihan utang/ cicilan" },
  ];

  useEffect(() => {
    const calculateIncome = transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === "income")
        return accumulator + parseInt(currentValue.nominal);
      return accumulator;
    }, 0);

    setTotalIncome(calculateIncome);
  }, [transactions]);

  const onSubmitIncome = () => {
    const validate = validateForms();
    if (!validate) return;

    const transactionTemp = {
      type: "income",
      jenisTransaksi: jenisTransaksi.value,
      name: namaTransaksi,
      nominal: nominalTransaksi,
      transactionDate: tanggalTransaksi,
    };

    const tempTransactions = [...transactions, transactionTemp];
    setTransactions(tempTransactions);
    localStorage.setItem("transactions", JSON.stringify(tempTransactions));

    toast({
      title: "Transaksi berhasil ditambahkan.",
      description: "Pengeluaran telah dicatat.",
      status: "success",
      duration: 3000,
      position: isMobile ? "bottom" : "top",
      isClosable: true,
    });

    setNamaTransaksi("");
    setJenisTransaksi(null);
    setNominalTransaksi(0);
    setTanggalTransaksi(new Date().getTime());
  };

  const validateForms = () => {
    if (isEmpty(namaTransaksi)) {
      toast({
        title: "Gagal.",
        description: "Mohon mengisi nama transaksi.",
        status: "error",
        duration: 1500,
        position: isMobile ? "bottom" : "top",
        isClosable: true,
      });
      return false;
    }
    if (isEmpty(nominalTransaksi)) {
      toast({
        title: "Gagal.",
        description: "Mohon mengisi jumlah transaksi.",
        status: "error",
        duration: 1500,
        position: isMobile ? "bottom" : "top",
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Input Pemasukan
        </Heading>
        <FormControl m={"1em 0"} isRequired>
          <FormLabel>Jenis Transaksi</FormLabel>
          <CreatableSelect
            isClearable
            options={options}
            value={jenisTransaksi}
            onChange={(item) => setJenisTransaksi(item)}
          />
        </FormControl>
        <FormControl m={"1em 0"} isRequired>
          <FormLabel>Nama Transaksi</FormLabel>
          <Input
            type="text"
            placeholder="Masukan nama Transaksi"
            value={namaTransaksi}
            onChange={(e) => setNamaTransaksi(e.target.value)}
          />
        </FormControl>
        <FormControl m={"1em 0"} isRequired>
          <FormLabel>Jumlah Transaksi</FormLabel>
          <Input
            type="number"
            placeholder="Masukan Nominal Transaksi"
            value={nominalTransaksi}
            onChange={(e) => setNominalTransaksi(e.target.value)}
          />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Tanggal Transaksi</FormLabel>
        </FormControl>
        <DatePicker
          className={styles["datepicker-input"]}
          placeholderText="Date Picker"
          selected={tanggalTransaksi}
          onChange={(date) => setTanggalTransaksi(date.getTime())}
        />
      </Box>
      <Divider border="1px solid #000000" mt={"2em"} />
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Total Pemasukan saat ini: <span></span>
        </Heading>
        <Heading as="h5" size="md" fontWeight="bold">
          Rp{formatter.format(totalIncome)}
        </Heading>

        <Flex mt={1} justifyContent="flex-start" alignItems="center">
          <Text>Harga Modal</Text>{" "}
          <Text ml="7em" fontWeight="500">
            Rp. 7.000.000
          </Text>
        </Flex>

        <Box mt={"2em"}>
          <Flex justifyContent="center" alignItems="center">
            <Button
              colorScheme="teal"
              size="lg"
              borderRadius="28px"
              onClick={onSubmitIncome}
            >
              Submit Pemasukan
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default IncomeComponent;
