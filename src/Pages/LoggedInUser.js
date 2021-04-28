class LoggedInUser {
  isLoggedIn = () => this.get('isLoggedIn') === 'true';

  set = (key, value) => localStorage.setItem(key, value);

  get = key => this.getLocalStorage(key);

  getLocalStorage = key => {
    const ret = localStorage.getItem(key);
    if (ret) {
      return ret;
    }
    return null;
  };

  login = async (email, password) => {
    this.set('isLoggedIn', true);
    return true;
  };

  logout = async () => {
    this.set('isLoggedIn', false);
    return true;
  };
}

export default new LoggedInUser();
