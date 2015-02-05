define([
	'directives/Directives',
	'components/kineticjs/kinetic',
	'factories/CountriesFactory',
	'factories/BattleFactory'
], function (Directives, Kinetic) {
	Directives.directive("game", ['$log', 'Countries', 'Battle', function ($log, Countries, Battle) {
		return {
			restrict: 'A',
			link: function ($scope, element, attrs) {

				element
					.css('background-image', 'url("img/map/background.jpg")');


				function Map(data) {
					this.tiles = data.tilesets[0];
					this.tilesResource = new Image();
					this.tilesResource.src = '/img/tiles/' + this.tiles.image;
					this.width = data.width;
					this.height = data.height;
					this.tileHeight = data.tileheight; //PX
					this.tileWidth = data.tilewidth; //PX
					this.layers = data.layers;
					//Detect if simple or double array
					if (this.layers.length === 0) {
						throw new Error("Map doesn't contain layers");
					}

					angular.forEach(this.layers, function (layer) {
						//If received array is plane, we need to convert it to double level array
						if (layer.data.length > layer.height) {
							var doubleDimData = [];
							for (var i = 0; i < layer.height; i = i + 1) {
								doubleDimData.push(layer.data.slice((i * layer.width), (1 + i) * layer.width));
							}
							layer.data = doubleDimData;
						}
					});
					this.tiles.xCount = this.tiles.imageheight / this.tiles.tileheight;
					this.tiles.yCount = this.tiles.imagewidth / this.tiles.tilewidth;
				}


				/**
				 *
				 * @param {String/Dom Element}
				 * @param Map
				 * @constructor
				 */
				function Game(container, map) {

					this.map = map;
					this.SQUARE_HEIGHT_PX = map.tileHeight; //PX
					this.SQUARE_WIDTH_PX = map.tileWidth; //PX

					this.stage = new Kinetic.Stage({
						container: container,
						width: map.width * this.SQUARE_WIDTH_PX,
						height: map.height * this.SQUARE_HEIGHT_PX
					});


					var kineticLayers = {
						map: new Kinetic.Layer(),
						players: new Kinetic.Layer()
					};

					//Draw each map layer
					this.map.tilesResource.onload = angular.bind(this, function () {
						angular.forEach(map.layers, angular.bind(this, function (layer) {
							this.drawMap(kineticLayers.map, layer.data);
							this.stage.add(kineticLayers.map);
						}));
					});

					/*
					 var players = {x: 5, y: 5};
					 this.drawPlayers(kineticLayers.players, players);
					 stage.add(kineticLayers.players);
					 */

				}

				Game.prototype.getColor = function () {
					var letters = '0123456789ABCDEF'.split('');
					var color = '#';
					for (var i = 0; i < 6; i = i + 1) {
						color += letters[Math.round(Math.random() * 15)];
					}
					return color;
				};

				/*
				 Game.prototype.drawPlayers = function(layer, players) {
				 var blockSize = 70 / 5;
				 var randomColor = this.getColor();
				 var group = new Kinetic.Group({
				 id: new Date().getTime(),
				 x: blockSize / 2,
				 y: blockSize / 2
				 });

				 var circle = new Kinetic.Arc({
				 x: players.x * blockSize,
				 y: players.y * blockSize,
				 outerRadius: blockSize / 2,
				 fill: randomColor,
				 angle: 360
				 }
				 );

				 group.add(circle);
				 layer.add(group);
				 }

				 */
				Game.prototype.drawMap = function (layer, map) {

					var group = new Kinetic.Group({
						id: new Date().getTime(),
						x: 0,
						y: 0
					});

					//this.tiles.xCount
					//this.tiles.yCount

					for (var y = 0; y < map.length; y = y + 1) {
						for (var x = 0; x < map[y].length; x = x + 1) {
							if (map[y][x] === 0) {
								continue;
							}
							var tile = new Kinetic.Image({
								x: x * this.SQUARE_WIDTH_PX,
								y: y * this.SQUARE_HEIGHT_PX,
								width: this.SQUARE_WIDTH_PX,
								height: this.SQUARE_HEIGHT_PX,
								name: "image",
								image: this.map.tilesResource,
								crop: {
									//Restamos 1 por que si no desplazamos a la derecha una casilla
									x: ((map[y][x] % this.map.tiles.xCount)-1) * this.map.tiles.tilewidth,
									y: Math.floor(map[y][x] / this.map.tiles.yCount) * this.map.tiles.tileheight,
									width: this.SQUARE_WIDTH_PX,
									height: this.SQUARE_HEIGHT_PX
								}
							});

							group.add(tile);
						}
					}

					layer.add(group);
					layer.draw();


					/*
					 var blockSize = this.SQUARE_PX;
					 var randomColor = this.getColor();

					 var group = new Kinetic.Group({
					 id: new Date().getTime(),
					 x: 0,
					 y: 0
					 });

					 for (var y = 0; y < map.length; y = y + 1) {
					 for (var x = 0; x < map[y].length; x = x + 1) {
					 var mapItem = map[y][x];

					 if (mapItem !== 0) {
					 var rectOptions = {
					 x: x * blockSize,
					 y: y * blockSize,
					 width: blockSize,
					 height: blockSize,
					 fill: randomColor,
					 stroke: '#000000',
					 strokeWidth: this.SQUARE_STROKE
					 };
					 group.add(new Kinetic.Rect(rectOptions));
					 }

					 }
					 }

					 layer.add(group);
					 layer.draw();

					 */

				};

				var mapInstance;
				var gameInstance;

				Battle.map({id: 12})
					.$promise
					.then(
					function (mapData) {
						mapInstance = new Map(mapData);
						gameInstance = new Game(element[0], mapInstance);
					},
					function () {
						$log.error("Something goes wrong loading the map :(");
					}
				);
			}
		};
	}])
	;
})
;
