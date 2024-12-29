export default class SessionManager {
  constructor() {
    this.visited = [];
    this.mount;
  }
  mount() {
    if (sessionStorage.getItem("visited")) {
      this.visited = JSON.parse(sessionStorage.getItem("visited"));
      if (this.visited.indexOf(window.location.pathname) > -1) {
        const transitioningElements = [
          ...document.querySelectorAll("[reveal]"),
        ];
        transitioningElements.forEach((el) => el.removeAttribute("reveal"));
      } else {
        this.visited.push(window.location.pathname);
      }
    } else {
      this.visited = [window.location.pathname];
    }
    sessionStorage.setItem("visited", JSON.stringify(this.visited));
  }
  pathIsVisited() {
    console.log(this.visited);
    return this.visited.indexOf(window.location.pathname) > -1;
  }
}
