define([
	'directives/Directives',
	'components/kineticjs/kinetic',
	'services/AnimationFrameService',
	'factories/BattleFactory'
], function (Directives, Kinetic) {
	Directives.directive("game", ['$log', '$interval', 'Countries', 'AnimationFrame', 'Battle', function GameDirective($log, $interval, Countries, AnimationFrame, Battle) {
		return {
			restrict: 'A',
			link: function ($scope, element, attrs) {

				var domElement = element[0];

				/**
				 *
				 * @param {Object}
				 * @constructor
				 */
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
				 * Creates a game instance, receiving as inout
				 *
				 * @param {DomElement | String} DomElement or String representing the dom ID
				 * @param map {Map}
				 * @constructor
				 */
				function Game(container, map) {

					this.map = map;
					this.SQUARE_HEIGHT_PX = map.tileHeight; //PX
					this.SQUARE_WIDTH_PX = map.tileWidth; //PX

					this.kinetic = {
						layers: {
							map: new Kinetic.Layer(),
							players: new Kinetic.Layer()
						},
						mapGroups: [],
						teamGroups: []
					};

					this.stage = new Kinetic.Stage({
						container: container,
						width: element.width(),//map.width * this.SQUARE_WIDTH_PX,
						height: map.tileWidth / map.tileHeight * element.width()//map.height * this.SQUARE_HEIGHT_PX
					});

					//Todo: update width on resize

					this.frames = frames;
					this.play = {
						frame: 0,
						last: 0
					};


					//Draw each map layer
					this.map.tilesResource.onload = angular.bind(this, function () {
						angular.forEach(map.layers, angular.bind(this, function (layer) {
							this.drawMap(this.kinetic.layers.map, layer.data);
							this.stage.add(this.kinetic.layers.map);
							this.stage.add(this.kinetic.layers.players);
						}));
					});


				}

				/**
				 *
				 * Generates a random color to be used on any object
				 *
				 * @method
				 * @returns {String} Hexadecimal color #000000
				 */
				Game.prototype.getColor = function () {
					var letters = '0123456789ABCDEF'.split('');
					var color = '#';
					for (var i = 0; i < 6; i = i + 1) {
						color += letters[Math.round(Math.random() * 15)];
					}
					return color;
				};


				/**
				 *
				 * Draw a map on a Kinetic.Layer
				 *
				 * @param {Kinetic.Layer} Kinetic layer where map must be drawed
				 * @param {Array} Map data
				 * @method
				 */
				Game.prototype.drawMap = function (layer, map) {

					var group = new Kinetic.Group({
						id: 'map',
						x: 0,
						y: 0,
						scaleX: this.stage.getWidth() / ((this.map.tileWidth - 2) * this.map.tiles.tilewidth),
						scaleY: this.stage.getHeight() / ((this.map.tileHeight - 2) * this.map.tiles.tileheight)
					});

					this.kinetic.mapGroups.push(group);

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
									x: ((map[y][x] % this.map.tiles.xCount) - 1) * this.map.tiles.tilewidth,
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

				};


				/**
				 *
				 * This method get first game chunk, reads it and program the first frame draw to the next AnimationFrameRequest
				 *
				 * @method
				 */
				Game.prototype.start = function () {
					var _self = this;
					this.play.frame = 0;
					this.play.last = 0;
					Battle.chunk({id: 12, chunkId: 1}) //todo: get parameters from state
						.$promise
						.then(function (frames) {
							_self.frames = frames;
							console.log("Game Started!");
							AnimationFrame.request(angular.bind(_self, _self.frame));
						}, function () {
							alert("Error ocurred loading game chunks")
						});
				};

				Game.prototype.stop = function () {
					AnimationFrame.cancel(angular.bind(this, this.frame));
				};

				Game.prototype.frame = function () {
					var _self = this;
					var now = new Date().getTime();
					if ((now - this.play.last) >= 0/*(1000 / 60)*/) {
						var frameTeams = this.frames[this.play.frame];
						//Iterate over all teams
						angular.forEach(frameTeams, function (team) {
							var teamKineticGroup = _self.kinetic.layers.players.children[team.id];
							//Create team kinetic group if doesnt exists
							if (angular.isUndefined(teamKineticGroup)) {
								var newTeamKineticGroup = new Kinetic.Group({
									id: "team_" + team.id,
									x: 0,
									y: 0,
									scaleX: _self.stage.getWidth() / ((_self.map.tileWidth - 2) * _self.map.tiles.tilewidth),
									scaleY: _self.stage.getHeight() / ((_self.map.tileHeight - 2) * _self.map.tiles.tileheight)
								});
								_self.kinetic.layers.players.add(newTeamKineticGroup);
								teamKineticGroup = _self.kinetic.layers.players.children[team.id];
							}

							//Iterate over all units in team
							angular.forEach(team.units, function (unit, index) {
								var unitKineticNode = teamKineticGroup.children[index];
								if (angular.isUndefined(unitKineticNode)) {
									var newUnitKineticNode = new Kinetic.Circle({
										x: unit.position.x,
										y: unit.position.y,
										fill: team.color, //Todo: random coloooor!
										radius: (_self.SQUARE_HEIGHT_PX / 2) - 2,
										stroke: 'white',
										strokeWidth: 2
									});
									teamKineticGroup.add(newUnitKineticNode);
								} else {
									unitKineticNode.setPosition({
										x: unit.position.x * _self.map.tiles.tilewidth,
										y: unit.position.y * _self.map.tiles.tileheight
									});
								}
							});
							_self.kinetic.layers.players.draw();
						});
						this.play.frame = this.play.frame + 1;
						this.play.last = now;
					}
					//Wait for net animation frame request
					AnimationFrame.request(angular.bind(this, this.frame));
				};

				var mapInstance;
				var gameInstance;

				$scope.start = function () {
					gameInstance.start();
				};

				$scope.stop = function () {
					gameInstance.stop();
				};

				Battle.map({id: 12})//todo: get parameters from state
					.$promise
					.then(
					function (mapData) {
						mapInstance = new Map(mapData);
						gameInstance = new Game(domElement, mapInstance);
						element
							.css('background-image', 'url("img/map/background.jpg")');
						gameInstance.start();

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
