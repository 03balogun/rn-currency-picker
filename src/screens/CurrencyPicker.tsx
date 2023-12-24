import React, { useState, useEffect, type FC, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Styles } from '../styles';
import dataCurrency from '../constants/CommonCurrency.json';
import { DialogCurrency, CurrencyFlag } from '../components';
import type { Currency, CurrencyData, CurrencyPickerProps } from '../types';

export const CurrencyPicker: FC<CurrencyPickerProps> = (props) => {
  const currencies = Object.values(dataCurrency);

  const [currencyName, setCurrencyName] = useState('US Dollar');
  const [code, setCode] = useState<string | Currency>('USD');
  const [symbol, setSymbol] = useState('$');
  const [symbolNative, setSymbolNative] = useState('$');
  const [visible, setVisible] = useState(false);

  const {
    onSelectCurrency,
    currencyCode,
    showFlag = true,
    showCurrencyName = true,
    showSymbol = false,
    showNativeSymbol = true,
    darkMode = false,
    renderChildren,
    showCurrencyCode = true,

    currencyPickerRef,
    enable = true,
    onOpen,
    onClose,

    containerStyle,
    modalStyle,

    title,
    searchPlaceholder,
    textEmpty,
    showCloseButton = true,
    showModalTitle = true,
  } = props;

  const currencyRef = useMemo(
    () => ({
      open: () => {
        setVisible(true);
        onOpen?.();
      },
      close: () => {
        setVisible(false);
        onClose?.();
      },
    }),
    [onClose, onOpen]
  );

  useEffect(() => {
    let currency;
    currencyPickerRef?.(currencyRef);

    if (currencyCode) {
      currency = currencies.filter((item) => item.code === currencyCode)[0];
    }

    if (currency) {
      const { symbol_native } = currency;
      setCurrencyName(currency.name);
      setCode(currency.code);
      setSymbol(currency.symbol);
      setSymbolNative(symbol_native);
    }
  }, [currencyCode, currencyPickerRef, currencies, currencyRef]);

  const onSelect = (data: CurrencyData) => {
    onSelectCurrency?.(data);
    setCurrencyName(data.name);
    setCode(data.code);
    setSymbol(data.symbol);
    setSymbolNative(data.symbol_native);
  };

  return (
    <View>
      {enable ? (
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            onOpen?.();
          }}
          style={[Styles.justifyContent, containerStyle?.container]}
        >
          {renderChildren ? (
            renderChildren
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {showFlag && (
                <CurrencyFlag
                  currency={code as Currency}
                  width={containerStyle?.flagWidth}
                />
              )}
              {showCurrencyCode && (
                <Text
                  style={[
                    styles.txtCurrencyCode,
                    containerStyle?.currencyCodeStyle,
                  ]}
                >
                  {code}
                </Text>
              )}
              {showCurrencyName && (
                <Text
                  style={[
                    styles.txtCountryName,
                    containerStyle?.currencyNameStyle,
                  ]}
                >
                  {currencyName}
                </Text>
              )}
              {showSymbol && (
                <Text
                  style={[styles.txtCountryName, containerStyle?.symbolStyle]}
                >
                  {symbol}
                </Text>
              )}
              {showNativeSymbol && (
                <Text
                  style={[
                    styles.txtCountryName,
                    containerStyle?.symbolNativeStyle,
                  ]}
                >
                  {symbolNative}
                </Text>
              )}
            </View>
          )}
        </TouchableOpacity>
      ) : null}
      <Modal visible={visible}>
        <DialogCurrency
          onSelectItem={(data) => {
            onSelect(data);
          }}
          setVisible={(value) => {
            setVisible(value);
            onClose && onClose();
          }}
          title={title}
          searchPlaceholder={searchPlaceholder}
          textEmpty={textEmpty}
          darkMode={darkMode}
          modalStyle={modalStyle}
          showCloseButton={showCloseButton}
          showModalTitle={showModalTitle}
          showCurrencySymbol={showSymbol}
          showCurrencyNativeSymbol={showNativeSymbol}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  txtCountryName: {
    ...Styles.fontDefault,
    marginLeft: 10,
  },
  txtCurrencyCode: {
    ...Styles.fontDefault,
    marginLeft: 10,
    fontWeight: '600',
  },
});
