# rn-currency-picker

React native currency picker that works!

## Installation

```sh
npm install rn-currency-picker
```

OR

```sh
yarn add rn-currency-picker
```

## Demo

<img src="https://github.com/03balogun/lib-gif/blob/main/rn-currency-picker-demo.gif?raw=true" width="350">

## Usage

```js

import CurrencyPicker from "react-native-currency-picker"

export default function App() {
  const currencyPickerRef = React.useRef < CurrencyPickerRef > ();

// use currencyPickerRef
  currencyPickerRef.open();
  currencyPickerRef.close();

  <Button
    title={'Open picker'}
    onPress={() => currencyPickerRef.current?.open()}
  />

  <Button
    title={'Close picker'}
    onPress={() => currencyPickerRef.current?.close()}
  />

  return <CurrencyPicker
    currencyPickerRef={(ref) => {
      currencyPickerRef.current = ref;
    }}
    enable={true}
    darkMode={false}
    currencyCode={"NGN"}
    showFlag={true}
    showCurrencyName={true}
    showCurrencyCode={true}
    onSelectCurrency={(data: CurrencyData) => {
      console.log("DATA", data)
    }}
    onOpen={() => {
      console.log("Open")
    }}
    onClose={() => {
      console.log("Close")
    }}
    showNativeSymbol={true}
    showSymbol={false}
    containerStyle={{
      container: {},
      flagWidth: 25,
      currencyCodeStyle: {},
      currencyNameStyle: {},
      symbolStyle: {},
      symbolNativeStyle: {}
    }}
    modalStyle={{
      container: {},
      searchStyle: {},
      tileStyle: {},
      itemStyle: {
        itemContainer: {},
        flagWidth: 25,
        currencyCodeStyle: {},
        currencyNameStyle: {},
        symbolStyle: {},
        symbolNativeStyle: {}
      }
    }}
    title={"Currency"}
    searchPlaceholder={"Search"}
    showCloseButton={true}
    showModalTitle={true}
  />
}

```


## Options

| Props                | Default    | Options/Info                                                                                                             |
| -------------------- |------------|--------------------------------------------------------------------------------------------------------------------------|
| enable (Boolean)             | true       | Show component for the choosen the currency.                                                                             |
| currencyPickerRef (Function) | null       | Get the open() and close() modal methods.                                                                                |
| darkMode (Boolean)           | false      | Dark mode for currency modal.                                                                                            |
| currencyCode (String)        | USD        | Currency code displayed is selected at start.                                                                            |
| onSelectCurrency (Function)  | null       | Called when the user chooses a currency and returns information for the selected currency(CurrencyData). See types below |
| onOpen (Function)            | null       | Called when the open modal.                                                                                              |
| onClose (Function)           | null       | Called when the close modal.                                                                                             |
| showNativeSymbol (Boolean)   | true       | Show the native symbol of the currency.                                                                                  |
| showSymbol (Boolean)         | false      | Show the symbol of the currency.                                                                                         |
| showFlag (Boolean)           | true       | Show the icon of the currency.                                                                                           |
| showCurrencyName (Boolean)   | true       | Show the name of the currency.                                                                                           |
| showCurrencyCode (Boolean)   | true       | Show the code of the currency.                                                                                           |
| title  (String)              | "Currency" | The title of the modal select currency.                                                                                  |
| showCloseButton  (Boolean)   | true       | Show the close button of the modal select currency.                                                                      |
| showModalTitle  (Boolean)    | true       | Show the title of the modal select currency.                                                                             |
| containerStyle  (Object)     | null       | Style for component that choose the currency. <br> **Note**: See more details below.                                     |
| modalStyle  (Object)         | null       | Style for modal select currency. <br> **Note**: See more details below.                                                  |
| renderChildren (Component)   | null       | The child component replaces the component element of the library                                                        |


## containerStyle

| Props                | Default | Options/Info |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container (Object)     | style          | Style for component container. |
| flagWidth (number)     | default: 25    | Width for the icon currency. |
| currencyCodeStyle (Object)   | style      | Style for currency code. |
| currencyNameStyle (Object)     | style  | Style for currency name. |
| symbolStyle (Object)   | style      | Style for currency symbol. |
| symbolNativeStyle (Object)   | style      | Style for currency native symbol. |


## modalStyle

| Props                | Default | Options/Info |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container (Object)     | style      | Style for modal container |
| searchStyle (Object)   | style      | Style for modal search input  |
| tileStyle (Object)     | style      | Style for modal title |
| itemStyle (Object)     | style      | Style for item select currency <br> **Note**: See more details below. |


## itemStyle

| Props                | Default | Options/Info |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| itemContainer (Object)     | style      | Style for item currency container |
| flagWidth (number)     | default: 25    | Width for the icon currency |
| currencyCodeStyle (Object)   | style    | Style for currency code   |
| currencyNameStyle (Object)     | style  | Style for currency name |
| symbolStyle (Object)   | style      | Style for currency symbol |
| symbolNativeStyle (Object)   | style      | Style for currency native symbol |

## Types

```ts
export type CurrencyData = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  flag_emoji: string;
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
  modalStyle?: DialogCurrencyProps['modalStyle'];
  title?: string;
  searchPlaceholder?: string;
  textEmpty?: string;
  showCloseButton?: boolean;
  showModalTitle?: boolean;
};

export type ItemStyle = {
  itemContainer?: ViewStyle;
  flagWidth?: number;
  currencyCodeStyle?: TextStyle;
  currencyNameStyle?: TextStyle;
  symbolStyle?: TextStyle;
  symbolNativeStyle?: TextStyle;
  container: ViewStyle;
};

export type ModalStyle = {
  itemStyle: ItemStyle;
  container: ViewStyle;
  searchStyle?: ViewStyle;
  tileStyle?: TextStyle;
};

```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Credits

This library is inspired by [react-native-currency-picker](https://github.com/alien9996/react-native-currency-picker)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
