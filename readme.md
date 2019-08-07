# jQuery Nao Inout
Advanced Input components for jQuery web applications.
This plugin has a few dependencies, so it is recommended to use if you are already using those dependencies in your project.

## Dependencies
- jQuery
- jQuery UI (slider widget only)
- jQuery mCustomScrollbar
- jQuery Nao Calendar (by me)
- jQuery Pseudo Ripple (by me)
- Aicon icon set (by me)

## Demo
[Live demo](https://naeemur.github.io/jquery-nao-input/)

## Input elements
```
// HTML
<input class="type-1" placeholder="Your Name">
<input class="type-2">
// JS
$('input.type-1').naoInput()
$('input.type-2').naoInput({ label: 'Your Email' })
```

## Combo box input
```
// HTML
<input class="type-3" label="Your Favorite">
// JS
$('input.type-3').naoInput({
  options: [
    'Tea',
    'Cola',
    'Coffee'
  ]
})
```

## Form elements
```
// JS
$('form').naoInput()
```

Use label attribute to define the label for an input element.

## License
The MIT License (MIT)

Copyright (c) 2019 Md. Naeemur Rahman (https://naeemur.github.io)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
