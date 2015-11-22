describe('user data', function () {
	it('should get user data', function () {
		browser.get('http://jswars.io/#/user/djwmarcx');

		var agentList = element.all(by.repeater('agent in agents'));
		expect(agentList.count()).toEqual(5);
		//expect(todoList.get(2).getText()).toEqual('write a protractor test');

		var tournametsList = element.all(by.repeater('tournament in tournaments'));
		expect(tournametsList.count()).toEqual(2);

		var profileRanking = element(by.binding('user.ranking'));
		expect(profileRanking.getText()).toEqual('122');

		var profileCountry = element(by.binding('user.country'));
		expect(profileCountry.getText()).toEqual('ES');

	});
});
