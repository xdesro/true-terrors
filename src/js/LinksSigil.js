import gsap from 'gsap';
import Observer from 'gsap/Observer';
import MatchMediaManager from './MatchMediaManager';

gsap.registerPlugin(Observer);

export default class LinksSigil {
  constructor() {
    this.active = false;
    this.RADIUS = 100;
    this.actionText = [
      'This layout isn’t working for me',
      'No...perform...the ritual.',
    ];

    this.list = document.querySelector('.links-list');
    this.listItems = document.querySelectorAll('.links-list li');
    this.description = document.querySelector('.links-page__description');
    this.button = document.querySelector('.links-page__action');

    this.list.classList.add('links-list--radial');
    this.description.classList.add('links-page__description--positioned');

    this.descriptionWidth = this.description.getBoundingClientRect().width;
    const { width: listWidth, height: listHeight } =
      this.list.getBoundingClientRect();
    const maxListItem = Math.max(
      ...[...this.listItems].map((item) => {
        return item.getBoundingClientRect().width;
      })
    );
    this.RADIUS = Math.min(
      Math.min(listWidth, listHeight) / 2 - maxListItem - 16,
      this.descriptionWidth / 2 + 32
    );
    this.rotationOffset = 0;
    this.frags = 360 / this.listItems.length;

    this.initialDraw();
    this.drawPositions();
    this.addListeners();
  }
  toggleLayoutClasses() {
    this.description.classList.toggle('links-page__description--positioned');
    this.list.classList.toggle('links-list--radial');
  }
  initialDraw() {
    this.active = true;
    this.listItems.forEach((listItem, i) => {
      const theta = (this.frags / 180) * i * Math.PI;
      //   const x = this.RADIUS * Math.cos(theta);
      const rotation = (theta * 180) / Math.PI;
      listItem.style.setProperty('--x', this.RADIUS);
      listItem.style.setProperty('--rotation', rotation);
    });
  }
  drawPositions() {
    const mainTheta =
      (this.frags / 180) * 0 * Math.PI - this.rotationOffset * 0.001;
    this.list.parentElement.style.setProperty(
      '--main-rotation',
      `${(mainTheta * 180) / Math.PI}deg`
    );
  }

  addListeners() {
    const { list } = this;
    const observer = Observer.create({
      preventDefault: true,
      target: list,
      type: 'wheel,touch',
      onChange: (self) => {
        this.active && self.event.preventDefault();
        this.rotationOffset += self.deltaY;
        this.drawPositions();
      },
    });
    MatchMediaManager.add(({ conditions }) => {
      const { prefersReducedMotion } = conditions;
      if (prefersReducedMotion) {
        observer.disable();
      } else {
        observer.enable();
      }
    });

    this.button.addEventListener('click', () => {
      this.active = !this.active;
      console.log('clicked');
      if (this.active) {
        observer.enable();
      } else {
        observer.disable();
      }
      gsap
        .timeline({
          onComplete: () => {
            this.toggleLayoutClasses();
            this.button.querySelector('span').textContent = this.active
              ? this.actionText[0]
              : this.actionText[1];
            gsap
              .timeline({ paused: true })
              .to('.links-list li', {
                opacity: 1,
              })
              .to(
                '.links-page__description',
                {
                  opacity: 1,
                },
                '<'
              )
              .to(
                '.links-page__action',
                {
                  opacity: 1,
                },
                '<'
              )
              .play();
          },
        })
        .to('.links-list li', {
          opacity: 0,
          stagger: 0.01,
        })
        .to(
          '.links-page__description',
          {
            opacity: 0,
          },
          '<'
        )
        .to(
          '.links-page__action',
          {
            opacity: 0,
          },
          '<'
        );
    });

    window.addEventListener('resize', (e) => {
      this.descriptionWidth = this.description.getBoundingClientRect().width;
      const { width: listWidth, height: listHeight } =
        this.list.getBoundingClientRect();
      const maxListItem = Math.max(
        ...[...this.listItems].map((item) => {
          return item.getBoundingClientRect().width;
        })
      );
      this.RADIUS = Math.min(
        Math.min(listWidth, listHeight) / 2 - maxListItem - 16,
        this.descriptionWidth / 2 + 32
      );
      this.initialDraw();
      this.drawPositions();
    });
  }
}
