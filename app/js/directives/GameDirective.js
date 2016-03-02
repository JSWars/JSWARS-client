define([
	'directives/Directives',
	'components/kineticjs/kinetic',
	'services/AnimationFrameService',
	'factories/BattleFactory'
], function (Directives, Kinetic) {
	Directives.directive("game", ['$log', '$q', '$timeout', '$interval', '$parse', 'Countries', 'AnimationFrame', 'BattleFactory', function GameDirective($log, $q, $timeout, $interval, $parse, Countries, AnimationFrame, BattleFactory) {
		return {
			restrict: 'A',
			scope: {
				restart: '=',
				start: '=',
				resume: '=',
				pause: '=',
				next: '=',
				battle: '=',
				onFrame: '=',
				onStart: '=',
				state: '='
			},
			link: function ($scope, element, attrs) {

				var battleContainer = element[0];
				var battleTimeElement = $('#battleTime');
				var shootAudio = new Audio('/sounds/shoot-lq.mp3');
				var dieAudio = new Audio('/sounds/die-lq.mp3');

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
					var _self = this;
					this.STATES = {
						'STOPPED': 'stopped',
						'PLAYING': 'playing',
						'PAUSED': 'paused',
						'ENDED': 'ended',
						'LOADING': 'loading'
					};
					this.state = $scope.state = this.STATES.STOPPED;
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
						width: this._getStageWidth(),
						height: this._getStageHeight(),
						scaleX: this._getStageScaleX(),
						scaleY: this._getStageScaleY()
					});

					//Resize when window does
					$(window).resize(function () {
						_self.stage.setWidth(_self._getStageWidth());
						_self.stage.setHeight(_self._getStageHeight());
						_self.stage.setScaleX(_self._getStageScaleX());
						_self.stage.setScaleY(_self._getStageScaleY());
						_self.stage.draw();
					});


					//Add bullets default group
					this.kinetic.bulletGroup = new Kinetic.Group({
						id: 'bulletGroup',
						x: 0,
						y: 0
					});

					this.kinetic.layers.bullets.add(this.kinetic.bulletGroup);

					this.play = {
						frame: 0,
						last: 0
					};

					//Draw each map layer
					this.map.tilesResource.onload = function () {
						angular.forEach(map.layers, function (layer) {
							_self.drawMap(_self.kinetic.layers.map, layer.data);
							_self.stage.add(_self.kinetic.layers.map);
							_self.stage.add(_self.kinetic.layers.players);
							_self.stage.add(_self.kinetic.layers.bullets);
						});
					};
				}

				/**
				 * Get current X stage scale
				 * @returns {number}
				 */
				Game.prototype._getStageScaleX = function () {
					return this._getStageWidth() / ((this.map.tileWidth - 2) * this.map.tiles.tilewidth);
				};

				/**
				 * Get current Y stage scale
				 * @returns {number}
				 */
				Game.prototype._getStageScaleY = function () {
					return this._getStageHeight() / ((this.map.tileHeight - 2) * this.map.tiles.tileheight);
				};

				/**
				 * Get stage width
				 * @returns {*}
				 * @private
				 */
				Game.prototype._getStageWidth = function () {
					return element.width();
				};

				/**
				 * Get stage heoght
				 * @returns {number}
				 * @private
				 */
				Game.prototype._getStageHeight = function () {
					return this.map.tileWidth / this.map.tileHeight * element.width();
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
						y: 0
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
				};


				/**
				 * Starts the game play
				 */
				Game.prototype.start = function () {
					var _self = this;
					this.state = $scope.state = this.STATES.LOADING;
					this.play.frameIndex = -1;
					this.play.last = 0;
					this.play.currentTime = 0;
					this.chunks = [];
					this._getChunk(0)
						.then(function () {
							$scope.onStart(_self.frameCount, _self.fps);
							_self.resume();
						}, function () {
							alert("Error ocurred loading game chunks");
						});
				};

				/**
				 * Set game play time yo 0
				 */
				Game.prototype.rewind = function () {
					this.state = $scope.state = this.STATES.PAUSED;
					this.play.frameIndex = -1;
					this.play.last = 0;
					this.play.currentTime = 0;
					this.play.lastTime = new Date().getTime();
					this.frame(true, 1);
				};

				/**
				 * Resume the game
				 */
				Game.prototype.resume = function () {
					this.play.lastTime = new Date().getTime();
					this.requestAnimationId = AnimationFrame.request(angular.bind(this, this.frame));
					this.state = $scope.state = this.STATES.PLAYING;
				};

				/**
				 * Pauses the game
				 */
				Game.prototype.pause = function () {
					AnimationFrame.cancel(this.requestAnimationId);
					this.state = $scope.state = this.STATES.PAUSED;
				};

				/**
				 * Loads a chunk from the server
				 * @param chunkId
				 * @returns {*}
				 * @private
				 */
				Game.prototype._getChunk = function (chunkId) {
					var _self = this;
					var deferred = $q.defer();
					_self.chunks[chunkId] = deferred.promise;
					console.log("Getting battle chunk " + chunkId);
					BattleFactory.chunk({id: $scope.battle._id, chunkId: chunkId})
						.$promise
						.then(function (chunk) {
							_self.chunks[chunkId] = chunk;
							deferred.resolve()
						}, function () {
							deferred.reject();
						});
					return deferred.promise;
				};

				Game.prototype._getFrameChunkIndex = function (frame) {
					return Math.floor((frame) / $scope.battle.chunkSize);
				};
				Game.prototype._getPartialFrameIndex = function (frame) {
					return frame - (this._getFrameChunkIndex(frame) * $scope.battle.chunkSize);
				};

				Game.prototype.frame = function (_single, _offset) {
					var _self = this;
					var now = new Date().getTime();
					//Detect if offset or next. Set currenttime
					if (typeof _offset === 'number') {
						this.play.currentTime = Math.max(this.play.currentTime + (_offset * this.frameDuration), 0)
					} else {
						this.play.currentTime += now - this.play.lastTime;
					}
					this.play.lastTime = now;
					this.play.frameIndex = Math.floor(this.play.currentTime / this.frameDuration);
					var chunkId = this._getFrameChunkIndex(this.play.frameIndex);
					var partialFrameId = this._getPartialFrameIndex(this.play.frameIndex);

					//If we have overpassed the middle of the current chunk, get next chunk
					if (angular.isUndefined(_self.chunks[chunkId + 1]) && partialFrameId > ($scope.battle.chunkSize / 2)) {
						_self._getChunk(chunkId + 1);
					}

					//Funciton to render a frame
					var renderFrame = function () {
						var frame = _self.chunks[chunkId][partialFrameId];
						if (angular.isUndefined(frame)) {
							_self.state = $scope.state = _self.STATES.ENDED;
							return;
						}

						var frameData = frame.data;
						if (!(typeof _single === 'boolean' && _single === true)) {
							this.requestAnimationId = AnimationFrame.request(angular.bind(this, this.frame));
						}
						//Iterate over bullets
						if (!angular.isUndefined(frameData.bullets) && Object.keys(frameData.bullets).length > 0) {
							angular.forEach(frameData.bullets, function (bullet, key) {
								var bulletKineticNode = _self.kinetic.bulletGroup.find('.bllt_' + key)[0];
								if (angular.isUndefined(bulletKineticNode)) {
									//Play sounds onky while playing
									if (_self.state == _self.STATES.PLAYING) {
										shootAudio.pause();
										shootAudio.currentTime = 0;
										shootAudio.play();
									}
									bulletKineticNode = new Kinetic.Circle({
										name: 'bllt_' + key,
										x: bullet.position.x * _self.map.tiles.tilewidth,
										y: bullet.position.y * _self.map.tiles.tileheight,
										fill: 'yellow',
										radius: _self.SQUARE_HEIGHT_PX * (0.1),
										stroke: 'black',
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
						angular.forEach(frameData.teams, function (team, _teamIndex) {
							var teamKineticGroup = _self.kinetic.layers.players.children[team.id];
							//Create team kinetic group if doesnt exists
							if (angular.isUndefined(teamKineticGroup)) {
								console.log("Create group");
								teamKineticGroup = new Kinetic.Group({
									id: "team_" + team.id,
									x: 0,
									y: 0
								});
								_self.kinetic.layers.players.add(teamKineticGroup);
							}

							angular.forEach(team.units, function (unit, _unitIndex) {
								var unitKineticNode = teamKineticGroup.children[_unitIndex];
								if (unit.alive === false && _self.chunks[_self._getFrameChunkIndex(_self.play.frameIndex - 1)][_self._getPartialFrameIndex(_self.play.frameIndex - 1)].data.teams[_teamIndex].units[_unitIndex].alive === true) {
									if (!angular.isUndefined(unitKineticNode)) {
										unitKineticNode.destroy();
										if (_self.state == _self.STATES.PLAYING) {
											dieAudio.pause();
											dieAudio.currentTime = 0;
											dieAudio.play();
										}
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
						_self.play.last = now;
					};


					if (typeof  this.chunks[chunkId].then == "function") {
						_self.state = $scope.state = _self.STATES.LOADING;
						console.log("Waiting for promise");
						_self.chunks[chunkId].then(function () {
							_self.play.lastTime = new Date().getTime();
							_self.state = $scope.state = _self.STATES.PLAYING;
							angular.bind(_self, renderFrame)();
						});
					} else {
						angular.bind(this, renderFrame)();
					}


					$timeout(function () {
						battleTimeElement.html($parse("(currentTime | date:'mm:ss:sss') + '/' + (totalTime | date : 'mm:ss:sss')")({
							currentTime: _self.play.currentTime,
							totalTime: $scope.battle.frameCount * (1000 / $scope.battle.fps)
						}));
						//$scope.onFrame(_self.play.currentTime, frame);
					}, 0);
				};

				var mapInstance;
				var gameInstance;

				//SCOPE FUNCTIONS


				$scope.next = function (offset) {
					gameInstance.frame(true, offset);
				};

				//Resumen
				$scope.resume = function () {
					gameInstance.resume();
				};

				//Starts the game
				$scope.start = function () {
					gameInstance.start();
				};

				//Set game to moment 0
				$scope.restart = function () {
					if (gameInstance.state === gameInstance.STATES.PLAYING) {
						gameInstance.pause();
					}
					gameInstance.rewind();
				};

				//Pauses the game
				$scope.pause = function () {
					if (gameInstance.state !== gameInstance.STATES.PAUSED) {
						gameInstance.pause();
					}
				};

				$scope.$watch('battle', function (battle) {
					if (!angular.isUndefined(battle) && !angular.isUndefined(battle.map)) {

						var fps = $scope.battle.fps;
						var frameCount = $scope.battle.frameCount;

						//Initial instances
						mapInstance = new Map($scope.battle.map.data);
						gameInstance = new Game(battleContainer, mapInstance, fps, frameCount);

						// Stop on controller destroy...
						$scope.$on('$destroy', function () {
							AnimationFrame.cancel(gameInstance.requestAnimationId);
						});
						//And now start the game
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
