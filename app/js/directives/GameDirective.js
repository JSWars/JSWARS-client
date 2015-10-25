define([
	'directives/Directives',
	'components/kineticjs/kinetic',
	'services/AnimationFrameService',
	'factories/BattleFactory'
], function (Directives, Kinetic) {
	Directives.directive("game", ['$log', '$q', '$timeout', '$interval', 'Countries', 'AnimationFrame', 'BattleFactory', function GameDirective($log, $q, $timeout, $interval, Countries, AnimationFrame, BattleFactory) {
		return {
			restrict: 'A',
			scope: {
				start: '=',
				pause: '=',
				next: '=',
				battle: '=',
				onFrame: '=',
				onStart: '='

			},
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
				function Game(container, map, fps, frameCount) {

					this.STATES = {
						'STOPPED': 'stopped',
						'PLAYING': 'playing',
						'PAUSED': 'paused',
						'ENDED': 'ended'
					};
					this.state = this.STATES.STOPPED;
					this.fps = fps;
					this.frameCount = frameCount || -1;
					this.frameDuration = 1000 / fps;
					this.map = map;
					this.SQUARE_HEIGHT_PX = map.tileHeight; //PX
					this.SQUARE_WIDTH_PX = map.tileWidth; //PX

					this.kinetic = {
						layers: {
							map: new Kinetic.Layer(),
							players: new Kinetic.Layer(),
							bullets: new Kinetic.Layer()
						},
						mapGroups: [],
						teamGroups: [],
						bulletGroup: undefined
					};

					this.stage = new Kinetic.Stage({
						container: container,
						width: element.width(),//map.width * this.SQUARE_WIDTH_PX,
						height: map.tileWidth / map.tileHeight * element.width()//map.height * this.SQUARE_HEIGHT_PX
					});

					//Add bullets default group
					this.kinetic.bulletGroup = new Kinetic.Group({
						id: 'bulletGroup',
						x: 0,
						y: 0,
						scaleX: this.stage.getWidth() / ((this.map.tileWidth - 2) * this.map.tiles.tilewidth),
						scaleY: this.stage.getHeight() / ((this.map.tileHeight - 2) * this.map.tiles.tileheight)
					});

					this.kinetic.layers.bullets.add(this.kinetic.bulletGroup);


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
							this.stage.add(this.kinetic.layers.bullets);
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
					this.state = this.STATES.PLAYING;
					this.play.frame = -1;
					this.play.last = 0;
					this.play.currentTime = 0;
					this.play.lastTime = new Date().getTime();
					this.chunks = [];
					var chunkId = 0;
					this.getChunk(chunkId)
						.then(function (chunkFrames) {
							$scope.onStart(_self.frameCount, _self.fps);
							_self.requestAnimationId = AnimationFrame.request(angular.bind(_self, _self.frame));
						}, function () {
							alert("Error ocurred loading game chunks");
						});
				};


				Game.prototype.getChunk = function (chunkId) {
					var _self = this;
					_self.chunks[chunkId] = null;
					var deferred = $q.defer();
					console.log("Getting chunk " + chunkId);
					BattleFactory.chunk({id: $scope.battle._id, chunkId: chunkId}) //todo: get parameters from state
						.$promise
						.then(function (chunk) {
							_self.chunks[chunkId] = chunk;
							deferred.resolve()
						}, function () {
							deferred.reject();
						});
					return deferred.promise;
				};

				Game.prototype.continue = function () {
					this.requestAnimationId = AnimationFrame.request(angular.bind(this, this.frame));
					this.state = this.STATES.PLAYING;
				};

				Game.prototype.pause = function () {
					AnimationFrame.cancel(this.requestAnimationId);
					this.state = this.STATES.PAUSED;
				};

				Game.prototype.frame = function (_single, _offset) {
					var _self = this;

					var now = new Date().getTime();

					if (typeof _offset === 'number') {
						this.play.currentTime += (_offset * this.frameDuration)
					} else {
						this.play.currentTime += now - this.play.lastTime;
					}

					this.play.lastTime = now;

					this.play.frame = Math.floor(this.play.currentTime / this.frameDuration);
					var chunkId = Math.floor(this.play.frame / $scope.battle.chunkSize);
					var partialFrameId = this.play.frame - (chunkId * $scope.battle.chunkSize);
					if (angular.isUndefined(_self.chunks[chunkId + 1]) && partialFrameId > ($scope.battle.chunkSize / 2)) {
						_self.getChunk(chunkId + 1);
					}
					var frame = this.chunks[chunkId][partialFrameId].data;

					//Iterate over all teams
					if (angular.isUndefined(frame)) {
						_self.state = _self.STATES.ENDED;
						return;
					} else {
						if (!(typeof _single === 'boolean' && _single === true)) {
							this.requestAnimationId = AnimationFrame.request(angular.bind(this, this.frame));
						}
					}

					//Iterate over bullets
					if (!angular.isUndefined(frame.bullets) && Object.keys(frame.bullets).length > 0) {
						angular.forEach(frame.bullets, function (bullet, key) {
							var bulletKineticNode = _self.kinetic.bulletGroup.find('.bllt_' + key)[0];
							if (angular.isUndefined(bulletKineticNode)) {
								bulletKineticNode = new Kinetic.Star({
									name: 'bllt_' + key,
									x: bullet.position.x * _self.map.tiles.tilewidth,
									y: bullet.position.y * _self.map.tiles.tileheight,
									numPoints: 5,
									innerRadius: _self.SQUARE_HEIGHT_PX * (bullet.radius - 0.1),
									outerRadius: _self.SQUARE_HEIGHT_PX * (bullet.radius + 0.1),
									fill: 'red',
									stroke: 'white',
									strokeWidth: 1
								});
								_self.kinetic.bulletGroup.add(bulletKineticNode);
							} else {
								bulletKineticNode.setPosition({
									x: bullet.position.x * _self.map.tiles.tilewidth,
									y: bullet.position.y * _self.map.tiles.tileheight
								});
							}

							bulletKineticNode.exist = true;
						});
					}

					angular.forEach(_self.kinetic.bulletGroup.children, function (bulletKineticNode, index) {
						if (angular.isUndefined(bulletKineticNode.exist)) {
							bulletKineticNode.remove();
						} else {
							bulletKineticNode.exist = undefined;
						}
					});
					_self.kinetic.layers.bullets.draw();


					//Iterate over teams
					angular.forEach(frame.teams, function (team) {
						var teamKineticGroup = _self.kinetic.layers.players.children[team.id];
						//Create team kinetic group if doesnt exists
						if (angular.isUndefined(teamKineticGroup)) {
							teamKineticGroup = new Kinetic.Group({
								id: "team_" + team.id,
								x: 0,
								y: 0,
								scaleX: _self.stage.getWidth() / ((_self.map.tileWidth - 2) * _self.map.tiles.tilewidth),
								scaleY: _self.stage.getHeight() / ((_self.map.tileHeight - 2) * _self.map.tiles.tileheight)
							});
							_self.kinetic.layers.players.add(teamKineticGroup);
						}

						//Iterate over units in team
						angular.forEach(team.units, function (unit, index) {
							var unitKineticNode = teamKineticGroup.children[index];
							if (unit.alive === false) {
								if (!angular.isUndefined(unitKineticNode)) {
									unitKineticNode.destroy();
								}
							} else {
								if (angular.isUndefined(unitKineticNode)) {
									var newUnitKineticNode = new Kinetic.Circle({
										x: unit.position.x * _self.map.tiles.tilewidth,
										y: unit.position.y * _self.map.tiles.tileheight,
										fill: team.color,
										radius: _self.SQUARE_HEIGHT_PX * unit.radius,
										stroke: 'white',
										strokeWidth: 1
									});
									teamKineticGroup.add(newUnitKineticNode);
								} else {

									unitKineticNode.setPosition({
										x: unit.position.x * _self.map.tiles.tilewidth,
										y: unit.position.y * _self.map.tiles.tileheight
									});
								}
							}
						});
						_self.kinetic.layers.players.draw();
						$scope.battle.teams[team.id].units = team.units;
						$scope.battle.teams[team.id].health = team.health;
					});
					this.play.last = now;

					$timeout(function () {
						$scope.onFrame(_self.play.currentTime, frame);
					}, 0);
				};

				var mapInstance;
				var gameInstance;

				$scope.next = function (offset) {
					gameInstance.frame(true, offset);
				};

				$scope.start = function () {
					if (gameInstance.state === gameInstance.STATES.PAUSED) {
						gameInstance.play.lastTime = new Date().getTime();
						gameInstance.continue();
					} else if (gameInstance.state !== gameInstance.STATES.PLAYING) {
						gameInstance.start();
					}
				};

				$scope.pause = function () {
					if (gameInstance.state !== gameInstance.STATES.PAUSED) {
						gameInstance.pause();
					}
				};

				$scope.$watch('battle', function (battle) {
					if(!angular.isUndefined(battle)){
						//Initial instances
						mapInstance = new Map($scope.battle.map.data);
						var fps = $scope.battle.fps;
						var frameCount = $scope.battle.frameCount;
						gameInstance = new Game(domElement, mapInstance, fps, frameCount);
						element
							.css('background-image', 'url("img/map/background.jpg")');
						gameInstance.start();
					}
				});



			}
		};
	}
	])
	;
})
;
