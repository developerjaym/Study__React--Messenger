class Utilities {
  static #authToken = "";
  static #AUTH_TOKEN_KEY = "authToken";
  static get CORS_PROXY() {
    return "https://localstorage.tools/api/simple/cors?url=";
    // return ""
  }

  static set authToken(newToken) {
    Utilities.#authToken = newToken;
    localStorage.setItem(Utilities.#AUTH_TOKEN_KEY, Utilities.#authToken);
  }

  static get authToken() {
    const token =
      Utilities.#authToken || localStorage.getItem(Utilities.#AUTH_TOKEN_KEY);
    Utilities.#authToken = token;
    return Utilities.#authToken;
  }

  static get isValid() {
    if (Utilities.#authToken) {
      const expiration =
        JSON.parse(atob(Utilities.#authToken.split(".")[1])).exp * 1000;
      const isExpired = expiration < new Date().getTime();
      return !isExpired;
    }
    return false;
  }

  static get user() {
    if (Utilities.#authToken) {
      const claims = JSON.parse(atob(Utilities.#authToken.split(".")[1]));
      return claims["username"];
    }
    throw Error("no user");
  }
}

class ChatAppHttpClient {
  static #URL = "http://127.0.0.1:5000";
  getAllChatters(onChattersReceived) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${ChatAppHttpClient.#URL}/chatters`, requestOptions)
      .then((response) => response.json())
      .then((result) => onChattersReceived(result))
      .catch((error) => console.log("error", error));
  }
  getChatterByUsername(username, onChatterReceived) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${ChatAppHttpClient.#URL}/chatters/${username}`, requestOptions)
      .then((response) => response.json())
      .then((result) => onChatterReceived(result))
      .catch((error) => console.log("error", error));
  }
  createChatter(chatter, onTokenReceived) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(chatter);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${ChatAppHttpClient.#URL}/chatters`, requestOptions)
      .then((response) => response.json())
      .then((result) => onTokenReceived(result.token))
      .catch((error) => console.log("error", error));
  }

  createChat(addedFriends, onChatCreated) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const raw = JSON.stringify(addedFriends);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/conversations`, requestOptions)
      .then((response) => response.json())
      .then((result) => onChatCreated(result))
      .catch((error) => console.log("error", error));
  }

  createMessage(conversationId, message, onMessageCreated) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const raw = JSON.stringify(message);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/conversations/${conversationId}/messages`, requestOptions)
      .then((response) => response.json())
      .then((result) => onMessageCreated(result))
      .catch((error) => console.log("error", error));
  }

  async getChatById(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/conversations/${id}`
    const response = await fetch(
      url,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  async getMessagesByConversationIdAndAfterId(conversationId, id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",

    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/conversations/${conversationId}/messages?after=${id}`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  getToken(credentials, onTokenReceived) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Basic " + btoa(`${credentials.username}:${credentials.password}`)
    );

    const raw = JSON.stringify(credentials);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${ChatAppHttpClient.#URL}/chatters/${credentials.username}/token`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => onTokenReceived(result.token))
      .catch((error) => console.log("error", error));
  }

  async getAllGamesForUser() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/games`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  createGameForUser(game, onDone, onError) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(game),
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/games`,
      requestOptions
    )
      .then((response) => response.json())
      .then(onDone)
      .catch(onError);
  }

  async getUser(username) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${username}`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  async getAllUsers() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  async getAllUsersChats(withOtherUser = null) {
    console.log('getAllUsersChats', Utilities.user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/conversations${withOtherUser ? '?with='+withOtherUser : ''}`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  async getAllUsersFriends() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/friends`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }

  async addFriend(friend) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(friend),
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/friends`,
      requestOptions
    );
    const json = await response.json();
    return json;
  }
  async deleteFriend(friend) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Utilities.authToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${ChatAppHttpClient.#URL}/chatters/${Utilities.user}/friends/${friend}`,
      requestOptions
    );
    const text = await response.text()
    return text;
  }  
}

const chatAppHttpClient = new ChatAppHttpClient();


class ChatPoller {
  static #POLL_PERIOD = 750;
  static #MAP = new Map();

  #conversationId;
  #listeners;
  #timer;
  #lastId;
  #previousMessages;
  constructor(conversationId) {
    this.#conversationId = conversationId;
    this.#lastId = 0;
    this.#listeners = [(newMessages) => this.#previousMessages = [...this.#previousMessages, ...newMessages]];
    this.#previousMessages = []
  }

  #addListener(onUpdate) {
    onUpdate(this.#previousMessages)
    this.#listeners.push(onUpdate)
    if(this.#listeners.length === 2) {
      // Got first external listener, time to start polling
      this.#timer = window.setInterval(() => this.#poll(),ChatPoller.#POLL_PERIOD)
    }
  }

  #removeListener(removeMe) {
    console.log('removing listener', removeMe);
    this.#listeners = this.#listeners.filter(listener => listener !== removeMe);
    if(this.#listeners.length === 1) {
      window.clearInterval(this.#timer)
    }
  }

  async #poll() {
    const newMessages = await chatAppHttpClient.getMessagesByConversationIdAndAfterId(this.#conversationId, this.#lastId);
    this.#listeners.forEach(listener => listener(newMessages));
    this.#lastId = newMessages.map(message => message.id).reduce((pre, cur) => cur > pre ? cur : pre, this.#lastId);
  }

  static subscribe(conversationId, onUpdate = (messages) => {}) {
    if(!ChatPoller.#MAP.has(conversationId)) {
      const newPoller = new ChatPoller(conversationId);
      ChatPoller.#MAP.set(conversationId, newPoller);
    }
    const chatPoller = ChatPoller.#MAP.get(conversationId);
    chatPoller.#addListener(onUpdate)
    return () => ChatPoller.unsubscribe(conversationId, onUpdate);
  }

  static unsubscribe(conversationId, listener) {
    ChatPoller.#MAP.get(conversationId).#removeListener(listener);
  }
}

export { Utilities, chatAppHttpClient, ChatPoller };
