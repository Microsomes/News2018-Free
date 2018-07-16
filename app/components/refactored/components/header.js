var nstoasts = require("nativescript-toasts");
const sourceModal= require("./../components/sourceSelect");
//source select modal
const httpModule = require("http");



module.exports={
    data(){
        return {
            title:"Newsify",
            state:{
                tag:'headlines',
                source:'bbc-news'
            }
        }
    },
    methods:{
        refreshNewsSource(){
        //method that refreshes news
        this.toToast("refreshing"+this.state.source);
        this.toToast("refreshing"+this.state.tag);
        },
        openSources(){
            var  home=this;
            this.toToast("Opening");
            this.$showModal(sourceModal).then(data => {
                
                
                if(data.type=="apiorg"){
                    console.log("api org");
                    //handie apiorg requests
                    this.loadApiOrgArticle_default(data.source);
                    //load news articles
                }            
            
            });

        },
        loadApiOrgArticle_default(source){
             var home=this;
            //load via source default
            console.log("loading");

            var apiLink="http://178.128.40.186/news/newsapi/"+source+",headlines,newsapiorg";
            httpModule.getJSON(apiLink).then((r) => {
               
                home.$emit("articlesLoad",r);
                //send data to main to process

            },(e)=>{
                console.log(e);
            });

        },
        toToast(msg){
            if(msg){
            //method will fire a toast
            var options = {
                text: msg,
                duration : nstoasts.DURATION.SHORT,
                position : nstoasts.POSITION.BOTTOM //optional
            }
            nstoasts.show(options);
        }
        },
        loadNews(tag,source,type){
            //method used to load news will load depending on source and tag
            //type e.g newsapi.org or generic
            if(type=="newsapiorg"){
                //load newsapi.org souces



            }else{
                //load generic news souces such as everything that is not newsapi.org
            }



        }



    },created(){
        this.loadApiOrgArticle_default("bbc-news");
    }
    ,
    template:
    `    
    <ActionBar flat="true" :title="title">
    <ActionItem @tap="openSources" text="Sources"></ActionItem>
    <ActionItem @tap="refreshNewsSource" android.systemIcon="ic_menu_refresh" android.position="actionBar" text="Sources"></ActionItem>
     </ActionBar>
 

    `
}