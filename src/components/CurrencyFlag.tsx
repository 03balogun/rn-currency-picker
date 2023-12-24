import React, { type FC } from 'react';
import { Text, View } from 'react-native';
import currencyFlags from '../constants/CommonCurrency.json';
import type { Currency } from '../types';

type CurrencyFlagProps = {
  currency: Currency;
  width?: number;
};

export const CurrencyFlag: FC<CurrencyFlagProps> = (props) => {
  const { currency, width } = props;
  const currencyData = currencyFlags[currency];

  if (!currencyData?.flag_emoji) return <View style={{ width: width }} />;
  return <Text style={{ width }}>{currencyData.flag_emoji}</Text>;
};
