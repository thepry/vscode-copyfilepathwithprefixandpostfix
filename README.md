## Features

Allows copying file path to clipboard with custom prefix and postifix

## Usage

This package includes two commands: `copyfilepathwithprefixandpostfix.copyFilePath` and `copyfilepathwithprefixandpostfix.copyFilePathWithLineNumber`, each of which can accept two string arguments: `prefix` and `postfix`. Prefix would be added before the file path and postfix after prior to copying it to the clipboard.

The following example would copy `bundle exec rspec [PATH TO THE CURRENT FILE]:[LINE NUMBER]` to the clipboard:

```
  {
    "before": ["<leader>", "f", "r"],
    "commands": [{
      "command": "copyfilepathwithprefixandpostfix.copyFilePathWithLineNumber",
      "args": ["bundle exec rspec "]
      }
    ],
  },
```

### LICENSE 

MIT