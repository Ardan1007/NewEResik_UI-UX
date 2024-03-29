import React, { useEffect, useState } from "react";
import {
  Image,
  Divider,
  ScrollView,
  VStack,
  Text,
  HStack,
  Box,
  Container,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";

const RincianPesanan = ({ route }) => {
  const { pesananId } = route.params;
  const [dataPesanan, setDataPesanan] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Gantilah "NamaPesanan" dengan referensi yang sesuai di Firebase
    const pesananRef = ref(getDatabase(), `Pesanan/${pesananId}`);
    
    // Menggunakan onValue untuk mendapatkan data secara real-time
    onValue(pesananRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDataPesanan(data);
      }
    });
  }, [pesananId]);

  return (
    <>
      <Header title={"Rincian Pesanan"} withBack="true" />
      <SafeAreaView flex={1}>
        <ScrollView flex={1}>
          <VStack px={5} pt={6}>
            {dataPesanan && (
              <Box
                bg={"#FFFF"}
                rounded="xl"
                overflow="hidden"
                shadow={4}
                borderColor="#0878CA"
                borderWidth="1"
                backgroundColor="#FFFF"
                pt={2}
                pr={4}
                pb={2}
                pl={4}
                mb={3}
              >
                <Box ml={2} m={2}>
                  <Text bold>{dataPesanan.nama}</Text>
                </Box>
                <Divider />
                
                <HStack px={2} py={2}>
                  <Image
                    source={require("../assets/icon.png")}
                    alt="Alternate Text"
                    size="md"
                    pt={2}
                    rounded={10}
                  />
                  <Container pl={2} pb={2}>
                    <Box>
                      <Text color={"#000000"}>ID Pesanan: {pesananId}</Text>
                      <Text color={"#000000"}>
                        Tanggal Pesanan: {dataPesanan.tanggal}
                      </Text>
                      <Text color={"#000000"}>Jenis: {dataPesanan.layanan}</Text>
                      <Text color={"#000000"}>Jumlah Cucian: {dataPesanan.berat} Kg</Text>
                      <Text color={"#000000"}>
                        No Hp: {dataPesanan.noHp}
                      </Text>
                      <Text color={"#000000"}>Keterangan: {dataPesanan.keterangan}</Text>
                      <Text color={"#000000"}>Total Harga: {dataPesanan.Harga}</Text>
                    </Box>
                  </Container>
                </HStack>
              </Box>
            )}
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RincianPesanan;
