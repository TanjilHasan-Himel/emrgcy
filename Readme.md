1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?

   a. getElementById
   টা শুধুমাত্র id দিয়ে element select করে। একটা HTML page এ একটা id একবারই ব্যবহার করা ভালো। দুইবার ব্যবহার করা ঠিক না। কারণ এটা সব সময় একটা element return করে।

   b. getElementsByClassName
   getElementsByClassName দিয়ে class এর নাম দিয়ে element select করা যায়। এর মাধ্যমে multiple element return করা যায়। আমরা যদি direct কোনো style change করতে চাই তাহলে loop use করে তা করতে পারবো।

   c. querySelector
   querySelector ব্যবহার করে CSS selector এর element select করা যায়। কিন্তু একটা বিষয় সব সময় লক্ষণীয় যে এটা সবসময় first matching element return করে।

   d. querySelectorAll
   querySelectorAll হলো querySelector এর মতই, কিন্তু এটা সব matching element return করে। এর মাধ্যমে loop এ কাজ করানো যায়।

2. How do you **create and insert a new element into the DOM**?

   DOM এ নতুন element add করার জন্য কিছু ধাপ অনুসরণ করতে হয়
   a. প্রথমে JavaScript দিয়ে একটি নতুন element বানাতে হয়।
   b.তারপর ওই element এর text বা attribute বসাতে হয়।
   c.সবশেষে নতুন element কে কোনো existing element এর ভিতরে insert করতে হয়।

3. What is **Event Bubbling** and how does it work?

   Event Bubbling হলো JavaScript এর একটা system যেখানে কোনো event যেমন click, প্রথমে inner element থেকে শুরু হয় এবং ধাপে ধাপে তার parent element গুলোর দিকে যায়।

   Example:

   ধরা যাক, একটা button আছে একটা div এর ভিতরে এবং div আছে body এর ভিতরে।
   যদি আমি button এ click করি:
   প্রথমে event button element এ trigger হবে।
   তারপর সেটা div element এ যাবে।
   শেষে সেটা body element এ পৌঁছাবে।

উপরের এই ধাপ ধরে উপরের দিকে event যাওয়াকেই বলে Event Bubbling।

4. What is **Event Delegation** in JavaScript? Why is it useful?

   Event Delegation হলো একটি technique যেখানে আমরা parent element এ event listener বসাই, আর সেটা automatically তার child element গুলোর জন্য কাজ করে।

   কিভাবে কাজ করে?

   সাধারনত আমরা যদি অনেকগুলো button বা list item এ event বসাতে চাই, তাহলে এক একটার জন্য আলাদা listener লিখতে হয়। কিন্তু Event Delegation এ আমরা parent এ একটা event listener দেই, আর event bubbling এর মাধ্যমে সেটা child পর্যন্ত পৌঁছে যায়। তারপর event.target use করার মাধ্যমে বুঝা যায় কোন child এ click হয়েছে।

5. What is the difference between **preventDefault() and stopPropagation()** methods?

   1. preventDefault():
      কোনো element এর default behavior বন্ধ করে। যেমন: form submit করলে normally page reload হয়, কিন্তু preventDefault() দিলে সেটা হবে না।

   2. stopPropagation():
      Event bubbling বা capturing থামিয়ে দেয়।মানে event আর parent element এর দিকে যাবে না।
