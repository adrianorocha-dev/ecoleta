import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';
import BackButton from '../../components/BackButton';

import styles from './styles';

type RouteParams = {
  point_id: number;
};

interface Data {
  point: {
    name: string;
    image: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    name: string;
  }[];
}

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>();

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  useEffect(() => {
    async function loadPointData() {
      const response = await api.get(`points/${routeParams.point_id}`);

      setData(response.data);
    }

    loadPointData();
  }, []);

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data?.point.email || ''],
    });
  }

  function handleWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${data?.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`
    );
  }

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackButton />

        <Image
          style={styles.pointImage}
          source={{
            uri: data.point.image,
          }}
        />

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>{data.items.map(item => item.name).join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" color="#FFF" size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" color="#FFF" size={20} />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
