---
layout: ../../layouts/BlogLayout.astro
title: Reversing a Linked List, or Why I Flubbed that Interview
---

# Reversing a Linked List, or Why I Flubbed that Interview

Classic _Data Structures & Algorithms_. Implement a linked list, a print function, and a reverse function. The moment the words were spoken to me my mind started it's O(n<sup>2</sup>) search for knowledge that had not been accessed in a very long time. In fact the pointer was found, but the value was not. So let's go over a refresher. For your sake, and mine.

## What is a linked list?

A linked list is a way of structuring data in which values are not stored in neighboring memory. Each link of the list contains a value and points to the next link, or node. As many or as few links can be used as needed, and the final link points to `null`. The first link is referred to as the `head`.

## What are the benefits of storing data in this structure?

Mostly to torment college students and interviewees. _I kid._ In reality the biggest practical benefits are for storing stacks and queues of varying length without having to allocate enough space in contiguous memory for potential growth. _Honestly, you've probably used them before without knowing it._

## "Get to it already, let's link some lists"

Alright, let's dive in.

**Here's a basic implementation that I wrote using Javascript classes.**

<div class="text-xs mt-5 -mb-5">Javascript</div>

```
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next ?? null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  prepend(value) {
    this.head = new Node(value, this.head);
  }

  print() {
    var output = "";
    var node = this.head;
    while (node !== null) {
      output += node.value;
      node = node.next;
    }
    console.log(output);
  }
}
```

**Let's look at the `Node` class first.** It has a constructor with 2 parameters. The first is the value to be stored in this node and the second is an optional `next` pointer. We check if the next param has a value and if it does we set it. Otherwise, there's not a whole lot going on here.

**Now for the `LinkedList` class.** The constructor has no params and sets the `head` to null. The `prepend` method has one param that corresponds to the value of the node to be added. A new node is created and the value passed to `prepend` is used for the first param of the `Node` constructor. The second param of the `Node` constructor is the current head (which may be null, which is fine, because the last node of the list has a value of `null` for it's `next` property).

I want to take a quick moment to show what the `prepend` first looked like. It could be argued that this is the better implementation because it's more readable and less likely to cause confusion for developers who may need to work on this class.

<div class="text-xs mt-5 -mb-5">Javascript</div>

```
prepend(value) {
  var oldHead = this.head.
  var newHead = new Node(value, oldHead)
  this.head = newHead;
}
```

You can see that the effect is the same, except it's written on three lines instead of one.

## Let's test it

Running the following code will output **"abc"** to the console.

<div class="text-xs mt-5 -mb-5">Javascript</div>

```
var list = new LinkedList();
list.prepend("c");
list.prepend("b");
list.prepend("a");

list.print();
```

_Works like a charm._

## Here's where it all went wrong

I'll be the first to admit that this implementation is much cleaner than the gibberish I wrote live in the aforementioned interview. That being said, we have now reached the point that makes me cringe.

**Implement a `reverse` method.**

I spent 15 minutes tooling back and forth to try and satisfy this requirement. Do you know how long 15 minutes feels while pair programming in an interview? In some ways it was a blink of an eye and others a lifetime. With each failed attempt my heart rate rose and anxiety increased. I tried thinking out loud to help illustrate my logic. That helped some, but in the end my time was cut short in an effort to continue the interview.

**Here's what I wish I had wrote.**

<div class="text-xs mt-5 -mb-5">Javascript</div>

```
reverse() {
  var prev = null;
  var node = this.head;
  while (node) {
    var next = node.next;
    node.next = prev;
    prev = node;
    node = next;
  }
  this.head = prev;
}
```

Two variables are needed outside of the loop to track the current and previous nodes. Inside the loop you need a temp var that stores the `next` node while you re-assign next to point in the other direction.

And so when the following code is executed, the text **"cba"** is printed to the console.

<div class="text-xs mt-5 -mb-5">Javascript</div>

```
var list = new LinkedList();
list.prepend("c");
list.prepend("b");
list.prepend("a");

list.reverse();
list.print();
```

## So there we have it

A concurrently simple and advanced logic puzzle. When you see the answer it makes perfect sense, but it is no means _easy_. Writing this makes me feel a lot better. I can pretend that this is my final answer, and fantasize how my interviewer might react. _Ah well._ In the very least it is a learning experience, and for that reason I am happy for it.

Good luck out there, and I hope this has been as _fun_ for you as it has been for me.

<a target="_blank" rel="nofollow" href="https://codepen.io/mattpeterse/pen/VwBzvJR">Here's a link</a> to the final code exercise on CodePend.
