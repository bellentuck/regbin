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
