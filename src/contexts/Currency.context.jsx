import {createContext, useState, useCallback, useMemo, useContext} from 'react';

export const Currencies = {
  euro: "€",
  dollar: "$"
}

export const CurrencyContext = createContext();
export const useCurrency = () => useContext(CurrencyContext);

export const useCurrencyColors = () => {
  const { Currency, oppositeCurrency } = useContext(CurrencyContext);
  return { Currency, oppositeCurrency };
};

export const CurrencyProvider = ({
  children
}) => {
  const [Currency, setCurrency] = useState(sessionStorage.getItem('currencyMode') ||Currencies.euro);

  const toggleCurrency = useCallback(() => {
    const newCurrencyValue = Currency === Currencies.euro ? Currencies.dollar : Currencies.euro;
    setCurrency(newCurrencyValue);
    sessionStorage.setItem('CurrencyMode', newCurrencyValue);
  }, [Currency]);

  const oppositeCurrency = useMemo(() => Currency === Currencies.euro ? Currencies.dollar : Currencies.euro, [Currency]);
  const value = useMemo(()=> ({ Currency, oppositeCurrency, toggleCurrency }), [Currency, oppositeCurrency, toggleCurrency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};