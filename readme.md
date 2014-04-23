## Quo

### Examining altmetrics over time

Using the Public Library of Science (PLOS) [Search API](http://api.plos.org/solr/faq/) and Public Library of Science (PLOS) [Article Level Metrics API](http://alm.plos.org) to visualise altmetrics changing over time.

### Requirements

* [Node.js](http://nodejs.org/) (including npm)
* [MongoDB](https://www.mongodb.org/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)

### Installation

* Clone `git clone git@github.com:40thieves/quo.git`
* Create `quo` database in MongoDB
* Run `npm install` from project root
* Run `grunt build` to fetch project assets

### Usage

#### Starting the server

Grunt is used to start MongoDB, boot the Express server under nodemon and start watching for Sass changes.

* Run `grunt`
* Application will be run on port 8001

#### Configuration

Configuration for the project is found un `lib/config/index.js`. Environments can be set by adding the following to the nodemon configuration in `Gruntfile.js`

```js
options: {
	args: ['YOUR_ENV_HERE']
}
```

### License

(The MIT License)

Copyright &copy; 2014 Alasdair Smith, [http://alasdairsmith.org.uk](http://alasdairsmith.org.uk)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
