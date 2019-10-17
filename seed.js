const categories = [
  {
    id: 'goals',
    name: 'goals',
  },
  {
    id: 'health',
    name: 'health',
  },
  {
    id: 'design',
    name: 'design',
  },
  {
    id: 'development',
    name: 'development',
  },
  {
    id: 'personal',
    name: 'personal',
  },
  {
    id: 'recipes',
    name: 'recipes',
  },
]

const notes = [
  {
    id: 'e0196fd9-d644-4ca8-aa58-467b8082993e',
    text:
      '## How Strings are Indexed\n\nEach of the characters in a string correspond to an index number, starting with `0`.\n\nTo demonstrate, we will create a string with the value `How are you?`.\n\n| H   | o   | w   |     | a   | r   | e   |     | y   | o   | u   | ?   |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  |',
    created: '2019-10-14T17:03:27-05:00',
    lastUpdated: '2019-10-14T17:03:27-05:00',
    category: '',
    favorite: false,
  },
  {
    id: '6a2923a6-8fed-4277-9286-49125c91d876',
    text:
      "Writing a Simple MVC App in Plain JavaScript\n\n---\ndate: 2019-07-30\ntitle: 'Writing a Simple MVC App in Plain JavaScript'\ntemplate: post\nthumbnail: '../thumbnails/triangle.png'\nslug: javascript-mvc-todo-app\ncategories:\n  - Popular\n  - Code\ntags:\n  - javascript\n  - mvc\n  - architecture\n---\n\nI wanted to write a simple application in plain JavaScript using the [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) architectural pattern. So I did, and here it is. Hopefully it helps you understand MVC, as it's a difficult concept to wrap your head around when you're first starting out.\n\nI made [this todo app](https://taniarascia.github.io/mvc), which is a simple little browser app that allows you to CRUD (create, read, update, and delete) todos. It just consists of an `index.html`, `style.css`, and `script.js`, so nice and simple and dependency/framework-free for learning purposes.\n\n#### Prerequisites\n\n- Basic JavaScript and HTML\n- Familiarity with [the latest JavaScript syntax](https://www.taniarascia.com/es6-syntax-and-feature-overview/)\n\n#### Goals\n\nCreate a todo app in the browser with plain JavaScript, and get familiar with the concepts of MVC (and OOP - object-oriented programming).\n\n- [View demo](https://taniarascia.github.io/mvc)\n- [View source](https://github.com/taniarascia/mvc)\n\n> **Note:** Since this app uses the latest JavaScript features (ES2017), it won't work as-is on some browsers like Safari without using Babel to compile to backwards-compatible JavaScript syntax.\n\n## What is Model View Controller?\n\nMVC is one possible pattern for organizing your code. It's a popular one.\n\n- **Model** - Manages the data of an application\n- **View** - A visual representation of the model\n- **Controller** - Links the user and the system\n\nThe **model** is the data. In this todo application, that'll be the actual todos, and the methods that will add, edit, or delete them.\n\nThe **view** is how the data is displayed. In this todo application, that will be the rendered HTML in the DOM and CSS.\n\nThe **controller** connects the model and the view. It takes user input, such as clicking or typing, and handles callbacks for user interactions.\n\nThe model never touches the view. The view never touches the model. The controller connects them.\n\n> I'd like to mention that doing MVC for a simple todo app is actually a ton of boilerplate. It would really be overcomplicating things if this was the app you wanted to create and you made this whole system. The point is to try to understand it on a small level so you can understand why a scaled system might use it.",
    created: '2019-10-14T17:01:39-05:00',
    lastUpdated: '2019-10-14T17:01:49-05:00',
    category: 'development',
    favorite: false,
  },
  {
    id: 'a4c5ea72-34ed-496d-aa90-096df7e1ffbd',
    text:
      "# Create and Deploy a Node JS Server\n\nRecently, I wanted to create and host a Node server, and discovered that [Heroku](https://heroku.com) is an excellent cloud platform service that has free hobby hosting for Node and PostgreSQL, among many other languages and databases.\n\nThis tutorial walks through creating a local REST API with Node using an Express server and PostgreSQL database. It also lists the instructions for deploying to Heroku.\n\n#### Prerequisites\n\nThis guide uses installation instructions for macOS and assumes a prior knowledge of:\n\n- [Command line usage](/how-to-use-the-command-line-for-apple-macos-and-linux/)\n- [Basic JavaScript](/javascript-day-one/)\n- [Basic Node.js and npm](/how-to-install-and-use-node-js-and-npm-mac-and-windows/)\n- [SQL](/overview-of-sql-commands-and-pdo-operations/) and [PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)\n- [Understanding REST/REST APIs](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697)\n\n#### Goals\n\nThis walkthrough will have three parts:\n\n- [Setting up a local **PostgreSQL database**](#set-up-postgresql-database)\n- [Setting up a local **Node/Express API server**](#create-express-api)\n- [Deploying the Node, Express, PostgreSQL API to **Heroku**](#deploy-app-to-heroku)\n\nWe'll create a local, simple REST API in Node.js that runs on an Express server and utilizes PostgreSQL for a database. Then we'll deploy it to Heroku.\n\nI also have a few production tips for validation and rate limiting.\n\n- [4. Production tips](#production-tips)\n\n## Set Up PostgreSQL Database\n\nWe're going to:\n\n- Install PostgreSQL\n- Create a user\n- Create a database, table, and entry to the table\n\nThis will be a very quick runthrough - if it's your first time using PostgreSQL, or Express, I recommend reading [Setting up a RESTful API with Node.js and PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/).\n\nInstall and start PostgreSQL.\n\n```bash\nbrew install postgresql\nbrew services start postgresql\n```\n\nLogin to `postgres`.\n\n```bash\npsql postgres\n```\n\nCreate a user and password and give them create database access.\n\n```bash\nCREATE ROLE api_user WITH LOGIN PASSWORD 'password';\nALTER ROLE api_user CREATEDB;\n```\n\nLog out of the root user and log in to the newly created user.\n\n```bash\n\\q\npsql -d postgres -U api_user\n```\n\nCreate a `books_api` database and connect to it.\n\n```sql\nCREATE DATABASE books_api;\n\\c books_api\n```\n\nCreate a `books` table with `ID`, `author`, and `title`.\n\n```sql\nCREATE TABLE books (\n  ID SERIAL PRIMARY KEY,\n  author VARCHAR(255) NOT NULL,\n  title VARCHAR(255) NOT NULL\n);\n```\n\nInsert one entry into the new table.\n\n```sql\nINSERT INTO books (author, title)\nVALUES  ('J.K. Rowling', 'Harry Potter');\n```\n\n## Create Express API\n\nThe Express API will set up an Express server and route to two endpoints, `GET` and `POST`.\n\nCreate the following files:\n\n- `.env` - file containing environment variables (does not get version controlled)\n- `package.json` - information about the project and dependencies\n- `init.sql` - file to initialize PostgreSQL table\n- `config.js` - will create the database connection\n- `index.js` - the Express server\n\n```bash\ntouch .env package.json init.sql config.js index.js\n```",
    created: '2019-10-14T17:00:31-05:00',
    lastUpdated: '2019-10-14T17:00:55-05:00',
    category: '',
    favorite: false,
    trash: true,
  },
  {
    id: '645fdc64-8511-469d-a2db-c7f04a36a9af',
    text:
      "# Roll Your Own Comment System\n\nA while ago, I [migrated my site from WordPress to Gatsby](/migrating-from-wordpress-to-gatsby/), a static site generator that runs on JavaScript/React. Gatsby [recommends Disqus](https://www.gatsbyjs.org/docs/adding-comments/) as an option for comments, and I briefly migrated all my comments over to it...until I looked at my site on a browser window without adblocker installed. I could see dozens of scripts injected into the site and even worse - truly egregious buzzfeed-esque ads embedded between all the comments. I decided it immediately had to go.\n\nI had no comments for a bit, but I felt like I had no idea what the reception of my articles was without having any place for people to leave comments. Occasionally people will leave useful critiques or tips on tutorials that can help future visitors as well, so I wanted to try adding something very simple back in.\n\nI looked at all the options, but I really didn't want to invest in setting up some third party code that I couldn't rely on, or something with ads. So I figured I'd set one up myself. I designed the simplest possible comment system in a day, which this blog now runs on.\n\nHere's some pros and cons to rolling your own comment system:\n\n#### Pros\n\n- Free\n- No ads\n- No third party scripts injected into your site\n- Complete control over functionality and design\n- Can be as simple or complicated as you want\n- Little to no spam because spambots aren't set up to spam your custom content\n- Easy to migrate - it all exists in one Heroku + Postgres server\n\n#### Cons\n\n- More work to set up\n- Less features\n\nIf you've also struggled with this and wondered if there could be an easier way, or are just intrigued to see one person's implementation, read on!\n ",
    created: '2019-10-14T16:58:09-05:00',
    lastUpdated: '2019-10-14T17:01:53-05:00',
    category: 'development',
    favorite: false,
  },
  {
    id: 'b2808149-a40f-4f3c-83bc-94db34881241',
    text:
      "# Developer Blogs to Follow\n\nI recently discovered that I ended up on the Hacker Noon awards for [Personal Developer Blog of the Year 2019](https://hackernoon.com/personal-developer-blog-of-the-year-hacker-noon-noonies-awards-2019-hz2tu32ql), which is an amazing honor! I got third place. I thought that was pretty neat, so I figured I'd mention it. Thank you all for reading, subscribing, and sharing my content!\n\nIn 2017, [I wrote a list](/web-developers-and-bloggers-i-follow-2017/) of some bloggers I follow, though much of the list wasn't actually web development related. I have a few favorites blogs I keep an eye on right now, so I'll share them with you.\n\nEveryone on this list has their own personal website/blog that isn't hosted on some third party like Medium, most of them have no ads, and I think they're all cool people in general.\n\n## Robin Wieruch\n\n- [robinwieruch.de](https://www.robinwieruch.de/)\n\nChances are, if you're looking for something about Firebase or React/Redux, you've probably ended up on Robin's blog. With good reason - he has tons of great tutorials.\n\n## Khalil Stemmler\n\n- [khalilstemmler.com](https://khalilstemmler.com/)\n\nKhalil is filling an all-too-rare niche in web development blogs, which is how to build large scale applications properly, specifically with TypeScript and Node. He's bridging the gap between intermediate and advanced, which is a difficult area to cover. Check it out if you're looking for something beyond \"Hello, World\"!\n\n## Flavio Copes\n\n- [flaviocopes.com](https://flaviocopes.com/)\n\nNo one is more prolific than Flavio. I honestly don't know how he has time to breathe, much less write all these tutorials. Not only does he write a blog post _every single day_, but he has endless handbooks, courses, and tutorials. Some of the posts are more like snippets, but you'll find nice, succint helpful stuff on there.\n\n## Dan Abramov\n\n- [overreacted.io](https://overreacted.io/)\n\nIf you're into JavaScript, and especially React, I'm sure you already know and love our React Overlord, Dan Abramov. Dan is known for his amazing contributions to JavaScript - Create React App and Redux - and his blog is known for long, insightful posts that cover unique areas of JavaScript and development in general. His [Things I Don't Know](https://overreacted.io/things-i-dont-know-as-of-2018/) and [Things I Know](https://overreacted.io/the-elements-of-ui-engineering/) have inspired many spinoff articles, including my [Everything I Know as a Software Developer Without a Degree](/everything-i-know-as-a-software-developer-without-a-degree/) post.\n\n## Swyx",
    created: '2019-10-14T16:57:24-05:00',
    lastUpdated: '2019-10-14T16:57:42-05:00',
    category: '',
    favorite: true,
  },
  {
    id: 'fa23b58e-2c2e-4c67-b6cd-4f7817ba7e89',
    text:
      "# This, Bind, Call, and Apply\n\nThe [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword is a very important concept in JavaScript, and also a particularly confusing one to both new developers and those who have experience in other programming languages. In JavaScript, `this` is a reference to an object. The object that `this` refers to can vary, implicitly based on whether it is global, on an object, or in a constructor, and can also vary explicitly based on usage of the `Function` prototype methods `bind`, `call`, and `apply`.\n\nAlthough `this` is a bit of a complex topic, it is also one that appears as soon as you begin writing your first JavaScript programs. Whether you're trying to access an element or event in [the Document Object Model (DOM)](https://www.digitalocean.com/community/tutorial_series/understanding-the-dom-document-object-model), building classes for writing in the object-oriented programming style, or using the properties and methods of regular objects, you will encounter `this`.\n\nIn this article, you'll learn what `this` refers to implicitly based on context, and you'll learn how to use the `bind`, `call`, and `apply` methods to explicitly determine the value of `this`.\n\n## Implicit Context\n\nThere are four main contexts in which the value of `this` can be implicitly inferred:\n\n- the global context\n- as a method within an object\n- as a constructor on a function or class\n- as a DOM event handler\n\n### Global\n\nIn the global context, `this` refers to the [global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object). When you're working in a browser, the global context is would be `window`. When you're working in Node.js, the global context is `global`.\n\n> **Note:** If you are not yet familiar with the concept of scope in JavaScript, please review [Understanding Variables, Scope, and Hoisting in JavaScript](/understanding-variables-scope-hoisting-in-javascript).\n\nFor the examples, you will practice the code in the browser's Developer Tools console. Read [How to Use the JavaScript Developer Console](/how-to-use-the-javascript-developer-console) if you are not familiar with running JavaScript code in the browser.\n\nIf you log the value of `this` without any other code, you will see what object `this` refers to.\n\n```js\nconsole.log(this)\n```\n\n```terminal\nWindow {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}\n```\n\nYou can see that `this` is `window`, which is the global object of a browser.\n\nIn [Understanding Variables, Scope, and Hoisting in JavaScript](/understanding-variables-scope-hoisting-in-javascript), you learned that functions have their own context for variables. You might be tempted to think that `this` would follow the same rules inside a function, but it does not. A top-level function will still retain the `this` reference of the global object.\n\nYou write a top-level function, or a function that is not associated with any object, like this:\n\n```js\nfunction printThis() {\n  console.log(this)\n}",
    created: '2019-10-14T16:54:08-05:00',
    lastUpdated: '2019-10-14T16:57:48-05:00',
    category: '',
    favorite: false,
  },
]

localStorage.setItem('categories', JSON.stringify(categories))
localStorage.setItem('notes', JSON.stringify(notes))
window.location.reload()
