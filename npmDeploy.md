# (1) Inits: (`.npmrc`)
- npm set init-author-name
- npm set init-author-email
- npm set init-author-url
- npm set init-license
- npm set save-exact
(--> whenever saving dependency to package.json, use exact version rather than a version range.)
("makes upgrading dependencies full of a lot fewer surprises")
`cat ~/.npmrc` to view
- npm adduser  (logs you into npm, gives you a secret auth token in yr .npmrc)
- (of course) npm init

# (2) To publish: `npm publish` (woo!)
- to view: http://npm.im/regbin

# (3) Post-publication
- npm info regbin  (view info)
- To Test:
1. go to another folder,
2. npm install,
3. create a file that pulls in the package (e.g. index.js),
4. and from command line `node index.js` (or whatever test file from 3)


# (4) add "version" tag to github repo
To associate with the commit corresponding with a particular release version.
- git tag 1.0.0  (release version)
- git push --tags
- Now, you can "draft a new release", fill it with info, associate it with the release version, and boom!

# (5) to update:
- update package number in `package.json` w/r/t semantic versioning ("semVer") conventions
- push changes to github
- push new tag (corresponding to version) to github
- npm publish!
--> N.B.: With continuous integration/semantic-release enabled, you don't have to set the version in package.json yourself. Instead, there are conventions for git messages that will signal to semantic-release how to handle versioning.

# (6) to automate releases:
- `npm install -g semantic-release-cli`
- "go to https://travis-ci.org and create an account that will ask you to link your github to travis" (https://github.com/semantic-release/cli/issues/196)
- `semantic-release-cli setup`  (basically just go with defaults)
--- as part of this process you can set up continuous integration. semantic-release automates this. By default, semantic-release can create a Travis CI "job" for the library.
- add a version field back into `package.json`. Semantic-release gets rid of this line, but npm will complain during install. Still, you want semantic-release/Travis keeping track of this info, not package.json. So, put `"version": "0.0.0-semantically-released"`.
- add to `travis.yml` to ensure we only publish once tests are working:
```yml
script:
  - npm run test
```
- may have to add "semantic-release pre" and "semantic-release post" to package.json

# (7) conventional commit format (https://conventionalcommits.org/)
- `npm install -D commitizen cz-conventional-changelog`
- add to package.json scripts: `"commit": "git-cz"`
- add to package.json:
```js
"czConfig": {
    "path": "node_modules/cz-conventional-changelog"
  }
```
