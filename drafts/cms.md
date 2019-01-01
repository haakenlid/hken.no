<!-- vim: set ft=markdown spl=en spell :-->

# Content Management System universitas.no

## What do I want to explain (Introduction 3 sentences)

The system is called prodsys. It is written with react.js redux talking to the
django backend over a rest-api made with django rest-framework. The cms is by
the staff to write texts and organize photos both for print and web publication.

### Why did I make this? (3 sentences)

This replaces an older custom system that was written i php. It was using an
insecure version of php and had to be replaced. The code was also a mess.
There's one django backend with a rest-api used by both the web frontend, the
cms and by a custom indesign addon used to in the print publication part of the
work flow.

### How did I make this? (3 sentences)

Like the public frontend of universitas.no, the cms is a single page application
written with react.js. I use redux for state management and redux saga for
asynchronous effects, such as keeping the state in sync with the server. I didn't
use any UI or css-in-js framework. It's just plain css written from scratch.

## Highlights ( 5 examples )

### Frontpage Editing

- Show zoom
- Show styling
- Show sizing
- Show cropping
- Show reordering

(Code snippet)
[Iframe with portal]

### Photo Upload

- (William Blake images)
- Show adding a photo
- Show resolving duplicates
- Show adding more photos
- Show Choosing byline
- Show photo ready
  (Code snippet)
  [Blob to query string]

### Story Preview

- Show work flow states
- Show live editing
- Show markup language
- Show image editing

(Code snippet)
[Tag parser]
