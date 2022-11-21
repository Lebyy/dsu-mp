class Fibonacci {
  constructor(el) {
    this.DOM = { el };
    this.DOM.count = this.DOM.el.querySelector('.count');
    this.previousValue = 0;
    this.DOM.horizontalLines = this.DOM.el.querySelectorAll('.line--horizontal');
    this.DOM.verticalLines = this.DOM.el.querySelectorAll('.line--vertical');
    this.init();
  }

  init() {
    this.randomizeLines();
    this.DOM.el.addEventListener('click', this.next.bind(this));
  }

  randomizeLines() {
    this.DOM.horizontalLines.forEach(line => {
      TweenMax.to(line, 1, {
        y: window.innerHeight,
        onComplete: () => {
          TweenMax.to(line, Math.random(), {
            y: 0 });

        } });

    });

    this.DOM.verticalLines.forEach(line => {
      TweenMax.to(line, Math.random(), {
        x: window.innerWidth,
        onComplete: () => {
          TweenMax.to(line, Math.random(), {
            x: 0 });

        } });

    });
  }

  baseLines() {
    this.DOM.horizontalLines.forEach((el, i, arr) => {
      TweenMax.to(el, 0.5, {
        y: window.innerHeight / i,
        onComplete: () => {
          TweenMax.to(el, 0.2, {
            alpha: 0,
            onComplete: () => {
              TweenMax.to(el, 0.2, {
                alpha: 1,
                onComplete: this.randomizeLines() });

            } });

        } });

    });

    this.DOM.verticalLines.forEach((el, i, arr) => {
      TweenMax.to(el, 0.5, {
        x: window.innerWidth / i,
        onComplete: () => {
          TweenMax.to(el, 0.2, {
            alpha: 0,
            onComplete: () => {
              TweenMax.to(el, 0.2, {
                alpha: 1,
                onComplete: this.randomizeLines() });

            } });

        } });

    });
  }

  next() {
    const num = Number(this.DOM.count.innerHTML);
    const add = num === 0 ? 1 : this.previousValue + num;
    this.previousValue = num;
    TweenMax.to(this.DOM.count, 0.2, {
      ease: Expo.easeIn,
      y: '-50%',
      opacity: 0,
      onComplete: () => {
        this.DOM.count.innerHTML = add;
        TweenMax.to(this.DOM.count, 0.6, {
          ease: Elastic.easeOut.config(1, 0.6),
          startAt: {
            y: '50%' },

          y: '0%',
          opacity: 1 });

      } });


    this.baseLines();
  }}


const fib = new Fibonacci(document.querySelector('.fib'));