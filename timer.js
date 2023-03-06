function Timer(callback, timeInterval, options) {
  this.timeInterval = timeInterval;
  this.totalTime = Infinity;

  this.start = () => {
    this.expected = Date.now() + this.timeInterval;

    if (options.immediate) {
      callback();
    }

    this.timeout = setTimeout(this.round, this.timeInterval);
  };

  this.stop = () => {
    clearTimeout(this.timeout);
  };

  this.round = () => {
    this.totalTime -= this.timeInterval;

    if (this.totalTime < 1000) {
      this.stop();
      return
    }

    let drift = Date.now() - this.expected;

    if (drift > this.timeInterval) {
      if (options.errorCallback) {
        options.errorCallback();
      }
    }

    callback();

    this.expected += this.timeInterval;
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  };
}

export default Timer;
