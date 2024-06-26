# Inyección de SQL

``` sql
`SELECT * FROM Repository WHERE TAG = ${userQuery} AND public = 1`;
```

## Template literals

```text
Template literals are a feature that allows for easy string interpolation and multiline strings. Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates. While convenient, they can be a security risk if not used carefully.
```

``` sql
`SELECT * FROM Repository WHERE TAG = 'javascript';--' AND public = 1`;
```
