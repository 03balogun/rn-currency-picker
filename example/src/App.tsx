import * as React from 'react';

import { StyleSheet, View, Button, Switch, Text } from 'react-native';
import { CurrencyPickerComponent } from 'rn-currency-picker';
import type { CurrencyPickerRef } from '../../src/types';

export default function App() {
  const currencyPickerRef = React.useRef<CurrencyPickerRef>();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [showFlag, setShowFlag] = React.useState(true);
  const [showCurrencyName, setShowCurrencyName] = React.useState(true);
  const [showCurrencyCode, setShowCurrencyCode] = React.useState(true);
  const [showNativeSymbol, setShowNativeSymbol] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.bottomSpacing}>
        <Text>Toggle theme: {isDarkMode ? 'Dark' : 'Light'}</Text>
        <Switch
          value={isDarkMode}
          onChange={() => setIsDarkMode((prevState) => !prevState)}
        />
      </View>

      <View style={styles.bottomSpacing}>
        <Text>{isEnabled ? 'Enabled' : 'Disabled'}</Text>
        <Switch
          value={isEnabled}
          onChange={() => setIsEnabled((prevState) => !prevState)}
        />
      </View>

      <View style={styles.bottomSpacing}>
        <Text>Show Flag</Text>
        <Switch
          value={showFlag}
          onChange={() => setShowFlag((prevState) => !prevState)}
        />
      </View>

      <View style={styles.bottomSpacing}>
        <Text>Show Currency Name</Text>
        <Switch
          value={showCurrencyName}
          onChange={() => setShowCurrencyName((prevState) => !prevState)}
        />
      </View>

      <View style={styles.bottomSpacing}>
        <Text>Show Currency Code</Text>
        <Switch
          value={showCurrencyCode}
          onChange={() => setShowCurrencyCode((prevState) => !prevState)}
        />
      </View>

      <View style={styles.bottomSpacing}>
        <Text>Show Native Symbol</Text>
        <Switch
          value={showNativeSymbol}
          onChange={() => setShowNativeSymbol((prevState) => !prevState)}
        />
      </View>

      {!isEnabled ? (
        <View style={styles.bottomSpacing}>
          <Button
            title={'Open picker'}
            onPress={() => currencyPickerRef.current?.open()}
          />
        </View>
      ) : null}

      <CurrencyPickerComponent
        currencyCode={'NGN'}
        darkMode={isDarkMode}
        showFlag={showFlag}
        enable={isEnabled}
        showCurrencyName={showCurrencyName}
        showCurrencyCode={showCurrencyCode}
        showNativeSymbol={showNativeSymbol}
        currencyPickerRef={(ref) => {
          currencyPickerRef.current = ref;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  bottomSpacing: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
