
const header= require("./components/header");
//header module
const tagSelector= require("./components/tagSelector");
//tag selector
const articleView= require("./components/articlesview");

module.exports={
    data(){
        return {
            isTagSelector:true
        }
    },
    template:
    `
    <Page class="page">  
    
    <header></header>
 
    <StackLayout>

    <tagSelector v-if="isTagSelector"></tagSelector>
      
    </StackLayout>
    
  </Page>



    `,
    components:{
        header,
        tagSelector
    }
}