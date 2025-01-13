import gsap from 'gsap';
import Observer from 'gsap/Observer';
import MatchMediaManager from './MatchMediaManager';

gsap.registerPlugin(Observer);

export default class LinksSigil {
  constructor() {
    this.RADIUS = 100;
    this.list = document.querySelector('.links-list');
    this.listItems = document.querySelectorAll('.links-list li');
    this.description = document.querySelector('.links-page-description');

    this.descriptionWidth = this.description.getBoundingClientRect().width;
    this.list.classList.add('links-list--radial');
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

    this.drawPositions();
    this.addListeners();
  }
  drawPositions() {
    const mainTheta =
      (this.frags / 180) * 0 * Math.PI - this.rotationOffset * 0.001;
    this.list.parentElement.style.setProperty(
      '--main-rotation',
      `${((mainTheta * 180) / Math.PI) * 0.1}deg`
    );
    this.listItems.forEach((listItem, i) => {
      const theta =
        (this.frags / 180) * i * Math.PI - this.rotationOffset * 0.001;
      const x = this.RADIUS * Math.cos(theta);
      const y = this.RADIUS * Math.sin(theta);
      const rotation = (theta * 180) / Math.PI;

      listItem.style.setProperty('--x', x);
      listItem.style.setProperty('--y', y);
      listItem.style.setProperty('--rotation', rotation);
    });
  }

  addListeners() {
    const { list } = this;
    const observer = Observer.create({
      preventDefault: true,
      target: list,
      type: 'wheel,touch',
      onChange: (self) => {
        self.event.preventDefault();
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

    window.addEventListener('resize', (e) => {
      this.descriptionWidth = this.description.getBoundingClientRect().width;
      this.list.classList.add('links-list--radial');
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
      this.drawPositions();
    });
  }
}
