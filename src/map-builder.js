// Default size of map (in tiles)
const DEFAULT_WIDTH = 30;
const DEFAULT_HEIGHT = 15;

export class MapBuilder {
  /**
   * Initialize MapBuilder parameters;
   *
   * @param {HTMLElement} container DOM node containing swatches and map
   * @param {{ width?: number, height?: number }} params
   */
  constructor(container, { width, height }) {
    /** @type {HTMLElement} */
    this.elem = container;

    // TODO: implement (add more member variables)
    // hint: consider the addition of optional height and width parameters
    this.width = width === undefined ? DEFAULT_WIDTH : width;
    this.height = height === undefined ? DEFAULT_HEIGHT : height;
  }

  /**
   * Initializes our {@link selectedSwatchName} to the default selected swatch.
   *
   * Adds a 'click' event listener to each element with the 'swatch' class, which
   * sets the selected swatch to the tile's own.
   */
  setupPalette() {
    const swatches = this.elem.querySelectorAll('.swatch');
    this.selectedSwatchName = Array.from(swatches).find((swatch) =>
      swatch.classList.contains('selected'),
    ).classList[1];

    swatches.forEach((swatch) => {
      swatch.addEventListener('click', (event) => {
        Array.from(swatches).forEach((otherSwatch) =>
          otherSwatch.classList.remove('selected'),
        );
        event.target.classList.add('selected');
        this.selectedSwatchName = event.target.classList[1];
      });
    });
  }

  /**
   * Creates the map in the `<div class="map">` (see index.html) using a "grid" of
   * divs, which are styled using the swatch styles in main.css.
   */
  setupMapCanvas() {
    // TODO: build grid with divs
    // hint: each row can use the 'row' class and each tile should use 'swatch' + some swatch type.
    //       check `setupPalette` for reference if you're not sure where to start!
    const mapContainer = document.querySelector('.map');

    for (let i = 0; i < this.height; i++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');

      for (let j = 0; j < this.width; j++) {
        const tileElement = document.createElement('div');
        tileElement.classList.add('swatch');
        tileElement.classList.add('grass');
        tileElement.addEventListener('mouseenter', (e) => {
          setTileDisplay(tileElement, this.selectedSwatchName);
          if (e.buttons === 1) {
            setTileType(tileElement, this.selectedSwatchName);
          }
        });
        tileElement.addEventListener('mouseleave', () => {
        setTileDisplay(tileElement, getTileType(tileElement));
        });
        tileElement.addEventListener('click', () => {
          setTileType(tileElement, this.selectedSwatchName);
          setTileDisplay(tileElement, this.selectedSwatchName);
        });
        rowElement.appendChild(tileElement);
      }
      mapContainer.appendChild(rowElement);
    }
    //
    // TODO: add event listeners to your swatches to handle mouse inputs for changing the map
    // hint: consider the following 4: mouseenter, mouseleave, mousedown, mouseup.
    //       we've also included helper functions below to manage display and tile storage!

  }
}

/**
 * Gets a tile's stored swatch type.
 *
 * @param {HTMLElement} tile
 * @returns {string} The swatch type's class name
 */
export function getTileType(tile) {
  return tile.dataset['type'] ?? 'grass';
}

/**
 * Sets a tile's stored swatch type.
 *
 * @param {HTMLElement} tile
 * @param {string} swatchType The swatch type's class name
 */
export function setTileType(tile, swatchType) {
  tile.dataset['type'] = swatchType;
}

/**
 * Updates a tile's appearance with the given swatch type.
 *
 * @param {HTMLElement} tile
 * @param {string} swatchType The swatch type's class name
 */
export function setTileDisplay(tile, swatchType) {
  tile.className = `swatch ${swatchType}`;
}
