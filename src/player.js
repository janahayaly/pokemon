// The size of a swatch (in pixels)
const SWATCH_SIZE = 25;

// Utility function - checks if a given swatch name is walkable terrain.
const isTerrain = (swatchType) =>
  [
    'grass',
    'flowers-red',
    'flowers-orange',
    'flowers-blue',
    'weed',
    'weed-4x',
    'weed-small',
    'weed-2x',
    'field',
    'sand-patch',
    'sand',
    'sand-nw',
    'sand-n',
    'sand-ne',
    'sand-w',
    'sand-e',
    'sand-sw',
    'sand-s',
    'sand-se',
    'sand-nw-inverse',
    'sand-ne-inverse',
    'sand-sw-inverse',
    'sand-se-inverse',
  ].indexOf(swatchType) >= 0;

export class Player {
  /**
   * Constructor for the player (Pikachu sprite).
   *
   * @param {number}     x       The beginning x coordinate (usually zero)
   * @param {number}     y       The beginning y coordinate (usually zero)
   * @param {MapBuilder} builder The MapBuilder object, with information about the map.
   *                             In particular, this builder object should have the container
   *                             element as a property so the '.map' div can be found using a
   *                             js 'elem.querySelector' call.
   */
  constructor(x, y, builder) {
    this.builder = builder;
    this.map = builder.elem.querySelector('.map');

    this.x = x;
    this.y = y;

    this.orientation = 'down';
    this.elem = document.createElement('div');
    this.elem.classList.add('player', 'facing-down');
    this.map.appendChild(this.elem);

    // TODO: add event listener to handle key press to make your
    //       pikachu moves when arrow keys are pressed
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        this.moveUp();
      } else if (e.key === 'ArrowDown') {
        this.moveDown();
      } else if (e.key === 'ArrowLeft') {
        this.moveLeft();
      } else if (e.key === 'ArrowRight') {
        this.moveRight();
      }
    });
  }

  /**
   * Changes the style of your character to face the
   * orientation provided as a parameter.
   *
   * @param {('down'|'up'|'left'|'right')} direction
   */
  setOrientation(direction) {
    const s = 'facing-' + direction;
    this.elem.classList.replace('facing-' + this.orientation, s);
    this.orientation = direction;
  }

  /**
   * Moves the character's div to some discrete tile, since the map is not continuous.
   *
   * @param {number} x
   * @param {number} y
   */
  moveTo(x, y) {
    // TODO: implement
    // hint: look into the .style field of your character object (elem)
    //       specifically the 'left' and 'top' properties
    this.x = x;
    this.y = y;
    this.elem.style.left = x * SWATCH_SIZE + 'px';
    this.elem.style.top = y * SWATCH_SIZE + 'px';
  }

  /**
   * does bounds checking to determine whether the provided move is valid.
   *
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  isValidMove(x, y) {
    return this.builder.width > x && this.builder.height > y && 0 <= x && 0 <= y;
  }

  // TODO: complete these function definitions: use your moveTo, isValidMove,
  //       and setOrientation implementations to make functions that move your
  //       character in a specific direction
  moveLeft() {
    this.setOrientation('left');
    const newX = this.x - 1;
    if (this.isValidMove(newX, this.y)) {
      this.moveTo(newX, this.y);
    }
  }

  moveRight() {
    this.setOrientation('right');
    const newX = this.x + 1;
    if (this.isValidMove(newX, this.y)) {
      this.moveTo(newX, this.y);
    }
  }

  moveDown() {
    this.setOrientation('down');
    const newY = this.y + 1;
    if (this.isValidMove(this.x, newY)) {
      this.moveTo(this.x, newY);
    }
  }

  moveUp() {
    this.setOrientation('up');
    const newY = this.y - 1;
    if (this.isValidMove(this.x, newY)) {
      this.moveTo(this.x, newY);
    }
  }
}
