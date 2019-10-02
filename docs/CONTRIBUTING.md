# Git
* No commits directly to `master`.
* New branches should be created for bug fixes and new features, with
the naming convention: `example-feature`.
* Merge requests need:
    * Tests
    * Follow style conventions
    * Have a description explaining the changes made
    * At least 2 other people assigned to review it
    * The commits to be squashed and the original branch deleted
* Long commit messages should be split into a short title, and a paragraph
  detailing the changes made, separated by an empty line. For example:
  ```git
  Style fixes.

  Changed the indentation from 2 spaces to 1 soft tab across all the project's files.
  ```
* In case your branch becomes outdated and you'd like to incorporate
  new changes made to master or the branch you're parting from, it's 
  recommended you `git fetch original-branch`, then either `git merge`,
  or `git rebase`.

# Coding Style
* Follow the Airbnb style guidelines.
* Use [prettier](https://prettier.io/) to auto format the code. The website
  contains tutorials to help integrate it with your text editor. It's
  recommended to set it up so it runs each time you save a file.
* It can be installed with the following command, along with a linter:
```console
npm install --save-dev --save-exact \
  eslint \
  babel-eslint \
  eslint-config-airbnb \
  eslint-config-babel \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-react \
  prettier \
  eslint-plugin-prettier \
  eslint-plugin-jsx-a11y
```
