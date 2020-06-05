import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={onPress || handleNavigateBack}>
      <Icon name="arrow-left" color="#34CB79" size={20} />
    </TouchableOpacity>
  );
};

export default BackButton;
