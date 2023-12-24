import currencyFlags from './constants/CommonCurrency.json';
import { TextStyle, ViewStyle } from 'react-native';
import React from 'react';

export type Currency = keyof typeof currencyFlags;

export type CurrencyData = (typeof currencyFlags)[Currency];

type ItemStyle = {
  itemContainer?: ViewStyle;
  flagWidth?: number;
  currencyCodeStyle?: TextStyle;
  currencyNameStyle?: TextStyle;
  symbolStyle?: TextStyle;
  symbolNativeStyle?: TextStyle;
  container: ViewStyle;
};

type ModalStyle = {
  itemStyle: ItemStyle;
  container: ViewStyle;
  searchStyle?: ViewStyle;
  tileStyle?: TextStyle;
};

export type DialogCurrencyProps = {
  onSelectItem: (item: CurrencyData) => void;
  title?: string;
  searchPlaceholder?: string;
  textEmpty?: string;
  setVisible: (visible: boolean) => void;
  darkMode?: boolean;
  modalStyle?: ModalStyle;
  showCloseButton?: boolean;
  showModalTitle?: boolean;
  showCurrencySymbol?: boolean;
  showCurrencyNativeSymbol?: boolean;
};

export type CurrencyPickerRef = {
  open: () => void;
  close: () => void;
};

export type CurrencyPickerProps = {
  onSelectCurrency?: (data: CurrencyData) => void;
  currencyCode?: Currency | string;
  showFlag?: boolean;
  showCurrencyName?: boolean;
  showSymbol?: boolean;
  showNativeSymbol?: boolean;
  darkMode?: boolean;
  renderChildren?: React.ReactNode;
  showCurrencyCode?: boolean;
  currencyPickerRef?: (methods: CurrencyPickerRef) => void;
  enable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  containerStyle?: ItemStyle;
  modalStyle?: ModalStyle;
  title?: string;
  searchPlaceholder?: string;
  textEmpty?: string;
  showCloseButton?: boolean;
  showModalTitle?: boolean;
};
