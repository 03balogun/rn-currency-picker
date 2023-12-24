import React, { type FC, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  Text,
} from 'react-native';
import Fuse from 'fuse.js';
import { Colors } from '../styles';
import data from '../constants/CommonCurrency.json';
import { getStyles } from './styles';
import { CurrencyFlag } from './CurrencyFlag';
import type { Currency, CurrencyData, DialogCurrencyProps } from '../types';

export const DialogCurrency: FC<DialogCurrencyProps> = (props) => {
  const currencies: CurrencyData[] = Object.values(data);

  const {
    onSelectItem,
    title = 'Currency',
    searchPlaceholder = 'Search',
    textEmpty = 'Empty data',
    setVisible,
    darkMode = false,
    modalStyle,
    showCloseButton = true,
    showModalTitle = true,
    showCurrencySymbol = false,
    showCurrencyNativeSymbol = true,
  } = props;

  const [search, setSearch] = useState('');
  const [listCurrency, setListCurrency] = useState<CurrencyData[]>(currencies);

  const flagWidth = modalStyle?.itemStyle?.flagWidth || 25;

  let _flatListRef = useRef<FlatList<CurrencyData> | null>();

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      setSearch('');
    };
  }, []);

  const styles = getStyles(darkMode);

  const options = Object.assign({
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'code'],
    id: 'id',
  });

  const fuse = new Fuse<CurrencyData>(
    currencies.map((item) => item),
    options
  );

  const onSelect = (item: CurrencyData) => {
    setSearch('');
    handleFilterChange('');
    StatusBar.setHidden(false);
    if (onSelectItem) onSelectItem(item);
    setVisible(false);
  };

  const renderItemTemplate = ({
    code,
    symbol,
    symbol_native,
    name,
  }: CurrencyData) => {
    return (
      <View style={[styles.item, modalStyle?.itemStyle?.itemContainer]}>
        <CurrencyFlag currency={code as Currency} width={flagWidth} />
        <Text
          style={[
            styles.currencyName,
            modalStyle?.itemStyle?.currencyCodeStyle,
          ]}
        >
          {code}
        </Text>
        <Text
          style={[
            styles.commonName,
            { flex: 1 },
            modalStyle?.itemStyle?.currencyNameStyle,
          ]}
        >
          {name}
        </Text>
        {showCurrencySymbol && (
          <Text
            style={[
              styles.commonSymbolCode,
              modalStyle?.itemStyle?.symbolStyle,
            ]}
          >
            {symbol}
          </Text>
        )}
        {showCurrencyNativeSymbol && (
          <Text
            style={[
              styles.commonSymbolCode,
              modalStyle?.itemStyle?.symbolNativeStyle,
            ]}
          >
            {symbol_native}
          </Text>
        )}
      </View>
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: CurrencyData;
    index: number;
  }) => {
    const isLastItem = listCurrency.length - 1 === index;
    return (
      <TouchableOpacity
        style={{ marginBottom: isLastItem ? 150 : 0 }}
        onPress={() => onSelect(item)}
      >
        {renderItemTemplate(item)}
      </TouchableOpacity>
    );
  };

  const handleFilterChange = (value: string) => {
    setSearch(value);

    let listDataFilter: CurrencyData[] = [];
    if (value === '') {
      listDataFilter = currencies;
    } else {
      const filteredCountries = fuse.search(value);

      if (_flatListRef.current)
        _flatListRef.current.scrollToOffset({ offset: 0 });
      filteredCountries.forEach((n) => {
        const item = currencies.filter(
          (i) => i.code === n.item.code.toString()
        );
        if (item.length > 0 && item?.[0]) listDataFilter.push(item[0]);
      });
    }
    setListCurrency(listDataFilter);
  };

  return (
    <View style={[styles.container, modalStyle?.container]}>
      <View style={styles.header}>
        {showModalTitle && (
          <Text style={[styles.titleModal, modalStyle?.tileStyle]}>
            {title}
          </Text>
        )}
        {showCloseButton && (
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setSearch('');
              handleFilterChange('');
              StatusBar.setHidden(false);
            }}
            style={styles.searchClose}
          >
            <Text style={styles.btnClose}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.search}>
        <View style={[styles.textInputContainer, modalStyle?.searchStyle]}>
          <TextInput
            autoFocus
            onChangeText={(text) => handleFilterChange(text)}
            value={search}
            placeholder={searchPlaceholder}
            placeholderTextColor={Colors.textFieldColor}
            style={[styles.textTitleSmallerWhite, styles.textInput]}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          ref={(ref) => (_flatListRef.current = ref)}
          data={listCurrency}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          ListEmptyComponent={() => (
            <View style={styles.listNullContainer}>
              <Text style={styles.txtEmpty}>{textEmpty}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
