bindir = node_modules/.bin
jshint = $(bindir)/jshint
mocha  = $(bindir)/mocha

test: static unit

static:
	$(jshint) --verbose src
	$(jshint) --verbose test

unit:
	APP_ENV=test $(bindir)/nyc $(bindir)/mocha

.PHONY: test
