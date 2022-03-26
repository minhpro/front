class Handler {
  close = (func) => {
    func(false);
  };
  toggle = (func, state) => {
    func(!state);
  };

  onChange = (e, func) => {
    func(e.target.value);
  };
  api = async (func, funcE) => {
    try {
      const res = await func();
      return res;
    } catch (error) {
      funcE();
      return console.log(error);
    }
  };
}

const handler = new Handler();

export default handler;
