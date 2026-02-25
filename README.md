1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer : 
getElementById: selects unique id.
getElementsByClassName: selects all elements of the same className.
querySelector: Uses CSS selectors to returns first matching elements.
querySelectorAll: selects to return all matching elements in a NodeList.

2. How do you create and insert a new element into the DOM?
Answer : Use document.createElement('tagName') to create the node tree .Use element.textContent or element.innerHTML to add the content. Use parentElement.appendChild(newElement)  to insert it into the DOM.

3. What is Event Bubbling? And how does it work?
Answer : Event Bubble is the process to action to the child element. then bubble ups to the parent, then grantparent then go until the root element.

4. What is Event Delegation in JavaScript? Why is it useful?
Answer : Event delegation use a single parent listener to manage multiple child event from bubbling, saving memory and handling dynamic elements.

5. What is the difference between preventDefault() and stopPropagation() methods?
Answer : preventDefault Stop the browser's default action like page refresh on the other hand stopPropagation Stops the event from bubbling up to parent elements.
