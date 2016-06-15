# Riot Router Tag
Build routes in riot using simple tags

## Demo
For a demo see my other project [riot-redux-boilerplate](https://github.com/markwylde/riot-redux-boilerplate)

## Example
```html
<router>

  <route path="/">
    <h1>Welcome to the Example</h1>
    <p>
      You can use <button onClick="window.location.route = '/page/2'">window.location.route = '/page/2'</button> 
      to change the route via javascript
    </p>
  </route>

  <route path="/ticker">
    <ticker />
  </route>

  <route path="/page/1">
    <h1>Page: 1</h1>
    This is page 1
  </route>

  <route path="/page/2">
    <h1>Page: 2</h1>
    This is page 2
  </route>

  <route path="/say">
    <h1>Say Something...</h1>
    You didn't choose anything to say
  </route>

  <route path="/say/:message">
    <h1>Say?</h1>
    {route.message}
  </route>

  <route path="/say/:message/to/:user">
    <h1>Say?</h1>
    {route.message} to {route.user}
  </route>

</router>
```