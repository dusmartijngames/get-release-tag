# Get version from tag

Get tag from GitHub release which can be used for e.g., 
versioning packages of your solution.

## Usage

Here's example full Release YAML you can use:

```yml
name: Release

on:
  release:
    types:
      - edited
      - released

jobs:
  Release:

    runs-on: ubuntu-latest

    steps:
    - id: get_tag
      name: Get release tag
      uses: dusmartijngames/get-release-tag@master

    - name: Display version
      run: |
        VERSION=$(echo "${{ steps.get_version.outputs.tag }}")
        echo $VERSION
```

If you then create new GitHub Release with tag `v0.0.1-demo.1`
then above `get_tag` will provide output value in `tag`
which you can use in follow-up actions. Task will remove prefix `v`
if one is provided in the tag name.

Examples tag names and outputs:

| Tag name         | Tag output      |
| ---------------- |-----------------|
| v1.2.3           | 1.2.3           |
| 2.3.4            | 2.3.4           |
| v0.0.1-preview.1 | 0.0.1-preview.1 |
