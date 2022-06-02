import axios from "axios";
import { LocalStorage } from "@raycast/api";
import { Clipboard, showHUD } from "@raycast/api";

export const createAccount = async () => {
  const storage = await LocalStorage.allItems();

  // parse storage
  const account = JSON.parse(storage.account);
  console.log(account.email);
  if (account.email) {
    showHUD("Account Already Created");
    return;
  }

  // get the available email domains
  const { data } = await axios.get("https://api.mail.tm/domains?page=1");

  // get the first domain
  const domain = data["hydra:member"][0].domain;

  // generate a random email address
  const email = `${Math.random().toString(36).substring(7)}@${domain}`;

  // generate a random password
  const password = Math.random().toString(36).substring(7);

  try {
    const { data } = await axios.post("https://api.mail.tm/accounts", {
      address: email,
      password,
    });

    // add password to the data object
    data.password = password;

    // get Jwt token
    const { data: token } = await axios.post("https://api.mail.tm/token", {
      address: email,
      password,
    });

    const account = {
      email,
      password,
      token: token.token,
      id: data.id,
    };

    // save the account details to local storage
    await LocalStorage.setItem("account", JSON.stringify(account));

    // save email to clipboard
    await Clipboard.copy(email);

    // show a HUD message
    await showHUD(`Account created successfully. Email copied to clipboard.`);
  } catch (error) {
    return "Error creating account";
  }
};
export const fetchMessages = async () => {
  // get all the items from local storage
  const storage = await LocalStorage.allItems();
  // parse storage
  const account = JSON.parse(storage.account);

  if (!account.email) {
    showHUD("Account not created");
    return;
  }

  try {
    const { data } = await axios.get("https://api.mail.tm/messages", {
      headers: {
        Authorization: `Bearer ${account.token}`,
      },
    });

    const email = data["hydra:member"];

    return email;
  } catch (error) {
    console.log(error);
  }
};
const deleteAccount = async () => {};
const showDeails = async () => {};
