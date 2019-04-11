# Dynamically Change Templates of a Vue component using functional components

## Steps to get started:
1. Create your parent Component with the logic it should have
2. Create functional components for each template you want 
3. in the parent component create a dynamic component element 
    <component :is=...
 and pass the props and event listeners to the functional component
4. in the functional components retrieve the props from the props object and the event listeners from the listeners object e.g
  @click="listeners.myClick"
  {{props.aprop}}
5. In the parent component create a computed or ordinary method and pass it as the value to the components attribute :is <component :is=theComputedProperty
