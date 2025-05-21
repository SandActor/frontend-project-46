### Hexlet tests and linter status:
[![Actions Status](https://github.com/SandActor/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SandActor/frontend-project-46/actions)
![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=SandActor_frontend-project-46&metric=coverage)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=SandActor_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=SandActor_frontend-project-46)


```bash
gendiff filepath1.json filepath2.json
```

Example output for nested structures:

```json
{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: null
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
          doge: {
            - wow: 
            + wow: so much
          }
          key: value
        + ops: vops
      }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
      deep: {
          id: 45
      }
  }
+ group3: {
      deep: {
          id: {
              number: 45
          }
      }
      fee: 100500
  }
}
```

Supported formats: JSON, YAML
Default output format: stylish

```bash
gendiff --format plain filepath1.json filepath2.json
```

Example output:

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

Available formats:
- `stylish` (default) - nested visual representation
- `plain` - flat list of changes