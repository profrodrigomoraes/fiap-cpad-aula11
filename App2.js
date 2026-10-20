import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [texto, setTexto] = useState('');
  const [itens, setItens] = useState([]);

  // Passo 2: ao abrir o aplicativo, lê a lista salva
  useEffect(() => {
    async function carregarItens() {
      try {
        const salvo = await AsyncStorage.getItem('itens');
        if (salvo !== null) {
          setItens(JSON.parse(salvo));
        }
      } catch (e) {
        console.log('Erro ao ler os itens', e);
      }
    }

    carregarItens();
  }, []);

  // Passo 1: ao adicionar, grava a nova lista
  async function adicionarItem() {
    if (texto === '') {
      return;
    }
    const novaLista = [...itens, texto];
    setItens(novaLista);
    setTexto('');

    try {
      await AsyncStorage.setItem('itens', JSON.stringify(novaLista));
    } catch (e) {
      console.log('Erro ao salvar os itens', e);
    }
  }

  // Passo 3: esvazia a lista e apaga o que foi salvo
  async function limparLista() {
    setItens([]);

    try {
      await AsyncStorage.removeItem('itens');
    } catch (e) {
      console.log('Erro ao limpar os itens', e);
    }
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
      <View style={styles.espaco} />
      <Button title="Limpar lista" color="#b00020" onPress={limparLista} />

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
  espaco: { height: 8 },
  lista: { marginTop: 16 },
  item: { fontSize: 18, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
