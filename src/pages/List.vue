<template>
    <component :is="getRandomComponent()" 
                @myClick="myBestClick()" 
                :myprop="amazingProp"/>
</template>

<script>
// By importing here webpack will bundle both components
import ListProj1 from './ListProj1.vue';
import ListProj2 from './ListProj2.vue';

export default {
  name: '',
  components:{
    //You can then just declare both and then use a computed or Method to calculate which component to load
    ListProj1,
    ListProj2,
    //Or use a computed method and dynamically load the component
    //You could also load only the component you want based on the webpack build
    //by getting a constant from exposed webpack DefinePlugin constant set during build
    ['List'+__PROJECT_NAME__]: ()=> import( /* webpackChunkName: "dynamic-component" */'./List'+__PROJECT_NAME__+'.vue')
  },
  computed:{
    getComponentFromComputed(){
      return  `List${__PROJECT_NAME__}`
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      amazingProp:'Just passing a prop from the parent template'
    };
  },
  methods:{
    getRandomNumber(maxNumber){
      return Math.floor(Math.random()*maxNumber) + 1;
    },
    getRandomComponent(){
      return `ListProj${this.getRandomNumber(2)}`
    },
    myBestClick(){
      console.log('clicked')
    }
  }
};
</script>

