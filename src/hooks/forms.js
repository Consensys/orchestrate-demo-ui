import { useState } from 'react';

export const useNetworkFormInput = () => {
  const defaultInput = '';
  const [name, setName] = useState(defaultInput);
  const [url, setUrl] = useState(defaultInput);
  const [urls, setUrls] = useState([]);
  const [validity, setValidity] = useState(false);

  const inputChangeNameHandler = event => {
    let newName = event.target.value;
    newName = newName.replace(/[^\w-]+/g, '');
    newName = newName.replace(/[_]+/g, '');
    newName = newName.toLowerCase();

    setName(newName);
    if (event.target.value.trim() === '') {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  const inputChangeUrlHandler = event => {
    let url = event.target.value;
    if (event.target.value.trim() !== '') {
      setValidity(true);
      setUrl(url);
    } else {
      setValidity(false);
    }
  };

  const inputClickUrlsHandler = event => {
    if (url !== '') {
      setUrls([...urls, url]);
    }

    resetUrl();
    console.log("OK")
    console.log(url)
    console.log(event)
  };

  const reset = () => {
    setName(defaultInput);
  };

  const resetUrl = () => {
    setUrl(defaultInput);
  };

  return {
    name,
    url,
    urls,
    setName,
    onChangeName: inputChangeNameHandler,
    onChangeUrl: inputChangeUrlHandler,
    onClickUrls: inputClickUrlsHandler,
    reset,
    resetUrl,
    validity
  };
};

export const useFaucetFormInput = (
  defaultName,
  defaultCreditorAccount,
  defaultChainRule,
  defaultCooldown,
  defaultAmount,
  defaultMaxBalance) => {
  const [name, setName] = useState(defaultName);
  const [creditorAccount, setCreditorAccount] = useState(defaultCreditorAccount);
  const [chainRule, setChainRule] = useState(defaultChainRule);
  const [cooldown, setCooldown] = useState(defaultCooldown);
  const [amount, setAmount] = useState(defaultAmount);
  const [maxBalance, setMaxBalance] = useState(defaultMaxBalance);
  const [validity, setValidity] = useState(false);

  const inputChangeNameHandler = event => {
    let newValue = event.target.value;

    setName(newValue);
    if (event.target.value.trim() === '') {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };

  const inputChangeCreditorAccountHandler = event => {
    let newValue = event.target.value;
    setCreditorAccount(newValue);
  };

  const inputChangeChainRuleHandler = event => {
    let newValue = event.target.value;
    setChainRule(newValue);
  };

  const inputChangeCooldownHandler = event => {
    let newValue = event.target.value;
    setCooldown(newValue);
  };

  const inputChangeAmountHandler = event => {
    let newValue = event.target.value;
    setAmount(newValue);
  };

  const inputChangeMaxBalanceHandler = event => {
    let newValue = event.target.value;
    setMaxBalance(newValue);
  };

  return {
    name,
    creditorAccount,
    chainRule,
    cooldown,
    amount,
    maxBalance,
    setName,
    onChangeName: inputChangeNameHandler,
    onChangeCreditorAccount: inputChangeCreditorAccountHandler,
    onChangeChainRule: inputChangeChainRuleHandler,
    onChangeCooldown: inputChangeCooldownHandler,
    onChangeAmount: inputChangeAmountHandler,
    onChangeMaxBalance: inputChangeMaxBalanceHandler,
    validity
  };
};