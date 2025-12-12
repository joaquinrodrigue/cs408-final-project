QUnit.module('api-calls', function() {
    QUnit.test('searchAllSets returns an object of set data', function(assert) {
        let done = assert.async();

        searchAllSets().then(result => {
            assert.true(typeof result === "object", "API returned data not in an array");
            assert.ok(result[0], "API call returned empty data object");
            done();
        });
        
    });

    QUnit.test('getSet returns a set data object', function(assert) {
        let done = assert.async();

        let testHeaders = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: "123456789",
                name: "test",
                words: "foo, bar"
            })
        };
        fetch(`${endpoint}`, headers).then(() => getSet("123456789")).then(result => {
            assert.true(typeof result === "object", "API returned a non-object result");
            assert.ok(result, "API returned empty object");
            assert.true(result.id === "123456789", "getSet returned an object with a different id? How did you do that?");
            assert.true(result.name === "test", "getSet did not return the right object name, expected: test, got: " + result.name);
            assert.true(result.words === "foo, bar", "getSet did not return the right object words, expected: foo, bar, got: " + result.words);
            done();
        });
    });

    QUnit.test('createSet creates a set', function(assert) {
        let done = assert.async();

        let testHeaders = {
            method: "GET"
        };

        createSet("test2", "foo, bar, foobar").then(result => {
            let id = result.substring(9);
            fetch(`${endpoint}/${id}`, testHeaders).then(result => {
                assert.true(typeof result === "object", "API returned a non-object result");
                assert.ok(result, "API returned empty object");
                assert.true(result.name === "test2", "createSet did not make object with the right name, expected: test2, got: " + result.name);
                assert.true(result.words === "foo, bar, foobar", "createSet did not make object with the right words, expected: foo, bar, foobar, got: " + result.words);
                done();
            });
        });
    });

    QUnit.test('deleteSet deletes a set', function(assert) {
        let done = assert.async();

        createSet("test3", "fizz, buzz").then(result => deleteSet(result.substring(9))).then(result => {
            let id = result.substring(13);
            getSet(id).then(result => {
                assert.true(typeof result === 'object', "API returned a non-object result");
                assert.notOk(result, "API returned object after delete was called");
            });
            done();
        });
    });
});
