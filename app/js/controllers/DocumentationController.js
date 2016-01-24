/**
 * Created by Luiss_000 on 11/12/2015.
 */
define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("DocumentationController", ['$http','$scope','State', function ($http, $scope, State) {

		$scope.editorOptions = {
			lineWrapping: true,
			lineNumbers: true,
			mode: 'javascript',
			readOnly: 'nocursor',
			theme: 'ambiance'
		};

		State.setState({
			title: "Documentation"
		});
		$http({method:'GET',url:'/samples/units.jsonsample',
		transformResponse: function (data) {
			return data;
		}}).then(function (resource){
				$scope['codeUnits']=resource.data;
			}
		);
		$http.get('/samples/agent.jssample').then(function (resource){
				$scope['codeAgent']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/map.jsonsample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeMap']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/game.jsonsample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeGameState']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/teams.jsonsample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeTeams']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/action.jssample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeAction']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/vector2d.jssample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeVector2D']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/bullet.jsonsample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeBullet']=resource.data;
			}
		);

		$http({method:'GET',url:'/samples/getpath.jssample',
			transformResponse: function (data) {
				return data;
			}}).then(function (resource){
				$scope['codeGetPath']=resource.data;
			}
		);

	}]);
});
