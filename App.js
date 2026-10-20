import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [texto, setTexto] = useState('');
  const [itens, setItens] = useState([]);

  function adicionarItem() {
    if (texto === '') {
      return;
    }
    setItens([...itens, texto]);
    setTexto('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de compras</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um item..."
        value={texto}
        onChangeText={setTexto}
      />
      <Button title="Adicionar" onPress={adicionarItem} />

      <FlatList
        style={styles.lista}
        data={itens}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f2f2f2' },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  lista: { marginTop: 16 },
  item: { fontSize: 18, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});