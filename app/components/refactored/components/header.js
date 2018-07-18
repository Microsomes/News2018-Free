var nstoasts = require("nativescript-toasts");
const sourceModal= require("./../components/sourceSelect");
//source select modal
const httpModule = require("http");
const applicationSettings = require("application-settings");

const SERVER_IP="192.168.0.54";


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
        refreshNews(){
            console.log("refreshing news");
        },
        changeTitle(title){
            var title= title;

             var str = title.replace(/\s+/g, ' ').toUpperCase();
             this.title="Newsify "+str;
        },

        refreshNewsSource(){
        //method that refreshes news
        this.toToast("refreshed scroll up if applicable");   
        this.loadApiOrgArticle_tag(this.state.tag);
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
        loadApiOrgArticle_tag(tag){
            if(tag=="Headlines"){
                console.log("creep back to full headlines");
                this.state.tag="headlines";
                this.loadApiOrgArticle_default(this.state.source);
                return;
            }
            this.$emit("loadProcess","loading");
            //send an emit to let the main page know we are loading news right now
             console.log("---------------");
             console.log(tag);
            this.state.tag= tag;

            console.log(this.state.source);
            console.log("----tag");
            console.log(tag);

          
            
             var home=this;
            //load via source default
            console.log("loading");

            var apiLink="http://"+SERVER_IP+"/news/newsapi/"+this.state.source+","+tag+",newsapiorg";
            httpModule.getJSON(apiLink).then((r) => {
               console.log("anaylying if articles returned isnt empty");
               let articles= r["articles"];
               if(articles.length<=0){
                   console.log("tag returned no data");
                   home.$emit("articles_error","no_data");
               }else{
                    home.$emit("articlesLoad",r);
                //send data to main to process
               }
                  

            },(e)=>{
                console.log(e);
            });
        },
        loadApiOrgArticle_default(source){
            this.$emit("show_article_is_loading","loading");
            //send emit to main page that an article loading is in progress
            this.state.source= source;
            var savedState= applicationSettings.setString("lastSource",source);
            //set source


            this.changeTitle(source);
            
             var home=this;
            //load via source default
            console.log("loading");

            var apiLink="http://"+SERVER_IP+"/news/newsapi/"+source+","+this.state.tag+",newsapiorg";
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
         var savedState= applicationSettings.getString("lastSource");
        if(savedState==undefined || savedState==null){
            //no saved state give dafault
            this.loadApiOrgArticle_default("bbc-news");
        }else{
            this.loadApiOrgArticle_default(savedState);
        }
         

    },
    mounted(){
        this.$on('test', function (msg) {
            console.log(msg)
        })
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