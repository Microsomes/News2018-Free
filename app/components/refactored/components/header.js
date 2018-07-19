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
        loadConspiracies(tag){
            var savedState= applicationSettings.setString("lastSource","cons");
            var lasedTag= applicationSettings.setString("lastTag",tag);
            tag= tag.toLowerCase();
            this.changeTitle("conspiracies");
            this.$emit("showLoadingState","loading...");
            var url="http://"+SERVER_IP+"/cons/getConspiracies/"+tag;
            var home=this;
            httpModule.getJSON(url).then((r) => {
               
                console.log(r);
                this.$emit("parse_article_cons",r);



            },(e)=>{
                 console.log(e);
            });
        },
        loadtelegraph(tag){
            this.$emit("showLoadingState","loading...");
            this.changeTitle("Telegraph");

            //load yahoo news
            this.state.source="telegraph";
            this.state.tag=tag;
            var savedState= applicationSettings.setString("lastSource","telegraph");
            var lasedTag= applicationSettings.setString("lastTag",tag);
            var url="http://"+SERVER_IP+"/crawler/telegraph/"+tag;
            var home=this;

            httpModule.getJSON(url).then((r) => {
               
                this.$emit("parse_article_telegraph",r);



            },(e)=>{
                 console.log(e);
            });
        },
        loadYahoo(tag){
            this.$emit("showLoadingState","loading...")
            //load yahoo news
            this.state.source="yahoo";
            this.state.tag=tag;
            var savedState= applicationSettings.setString("lastSource","yahoo");
            var lasedTag= applicationSettings.setString("lastTag",tag);
            var url="http://"+SERVER_IP+"/crawler/yahoo/"+tag;
            var home=this;

            httpModule.getJSON(url).then((r) => {
               
                this.$emit("parse_article_yahoo",r);


            },(e)=>{
                 console.log(e);
            });
        },
        loadRedditData(tag){
            this.state.source="reddit";
            //set the last source
            this.state.tag=tag;
            var savedState= applicationSettings.setString("lastSource","reddit");
            var lasedTag= applicationSettings.setString("lastTag",tag);

            console.log("loading reddit"+tag);
            var url="http://"+SERVER_IP+"/crawler/reddit/"+tag;
             var home=this;

             httpModule.getJSON(url).then((r) => {
               
                 this.$emit("parse_article_reddit",r);

            },(e)=>{
                 console.log(e);
             });
        },
        loadLiveUamapData(tag){

            this.state.source="liveuamap";
            //set the last source
            this.state.tag=tag;
            var savedState= applicationSettings.setString("lastSource","liveuamap");
            var lasedTag= applicationSettings.setString("lastTag",tag);
 
            console.log("processing"+tag);
            var url= "http://"+SERVER_IP+"/crawler/liveuamap/"+tag;
             var home=this;

            httpModule.getJSON(url).then((r) => {
               
                home.$emit("articlesLoad_live",r);

            },(e)=>{
                console.log(e);
            });
        },
        refreshNews(){
            console.log("refreshing news");
        },
        changeTitle(title){
             var title= title;

              var str = title.replace(/\s+/g, ' ').toUpperCase();
              this.title="Newsify "+str;
        },

        refreshNewsSource(){
            this.$emit("show_article_is_loading","loading");
             if(this.state.source=="telegraph"){
                //handle the refresh of this source slightly differntly
                this.loadtelegraph(this.state.tag);
                return;
            }
            if(this.state.source=="reddit"){
                //handle the refresh of this source slightly differntly
                this.loadRedditData(this.state.tag);
                return;
            }
            if(this.state.source=="liveuamap"){
                //handle the refresh of this source slightly differently
                this.loadLiveUamapData(this.state.tag);
                return;
            }
            if(this.state.source=="yahoo"){
                //handle the refresh of this source slightly differently
                this.loadYahoo(this.state.tag);
                return;
            }
            
        //method that refreshes news
         this.loadApiOrgArticle_tag(this.state.tag);
        },
        openSources(){
            var  home=this;
            this.toToast("Opening");
            this.$showModal(sourceModal).then(data => {
 
                if(data.filer){
                    //request to turn the filter on
                    console.log("filter on");
                    this.$emit("filter_change","on");
                }else{
                    //request to turn the filter off
                    console.log("filter off");
                    this.$emit("filter_change","off");
                }
                
                if(data.type=="apiorg"){
                    console.log("api org");
                    //handie apiorg requests
                    this.loadApiOrgArticle_default(data.source);
                    //load news articles
                }else if(data.type=="liveuamp"){
                    //will load in liveuamp related data
                    console.log("loading liveuamp related data");
                    this.loadLiveUamapData(data.source);
                }else if(data.type=="reddit"){
                    console.log("load reddit related data");
                    this.loadRedditData(data.source);
                }else if(data.type=="telegraph"){
                    console.log("loading telegraph related news");
                    this.loadtelegraph(data.source);
                }else if(data.type=="yahoo"){
                    console.log("loading yahoo related news");
                    this.loadYahoo(data.source);
                }else if(data.type=="cons"){
                    console.log("conspiracies processing");
                    this.loadConspiracies(data.source);
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
        var home=this;
         var savedState= applicationSettings.getString("lastSource");
        if(savedState==undefined || savedState==null){
            //no saved state give dafault
            this.loadApiOrgArticle_default("bbc-news");
        }else{
            if(savedState=="reddit"){
                //handle reddit reloads differently
                this.$emit("filter_change","off");

                var lasedTag= applicationSettings.getString("lastTag");
                if(lasedTag==undefined || lasedTag==null){
                    home.loadRedditData("FORTnITE");
                }else{
                    home.loadRedditData(lasedTag);
                }
                return;
            }
            if(savedState=="liveuamap"){
                //handle reddit reloads differently
                this.$emit("filter_change","off");

                var lasedTag= applicationSettings.getString("lastTag");
                if(lasedTag==undefined || lasedTag==null){
                    home.loadLiveUamapData("us");
                }else{
                    home.loadLiveUamapData(lasedTag);
                }
                return;
            }
            if(savedState=="cons"){
                //handle reddit reloads differently
                this.$emit("filter_change","off");

                var lasedTag= applicationSettings.getString("lastTag");
                if(lasedTag==undefined || lasedTag==null){
                    home.loadConspiracies("bitcoin");
                }else{
                    home.loadConspiracies(lasedTag);
                }
                return;
            }

             if(savedState=="telegraph"){
                //handle yahoo reloads differently
                this.$emit("filter_change","off");

                var lasedTag= applicationSettings.getString("lastTag");
                if(lasedTag==undefined || lasedTag==null){
                    home.loadtelegraph("headlines");
                }else{
                    home.loadtelegraph(lasedTag);
                }
                return;
            }
            if(savedState=="yahoo"){
                //handle yahoo reloads differently
                this.$emit("filter_change","off");

                var lasedTag= applicationSettings.getString("lastTag");
                if(lasedTag==undefined || lasedTag==null){
                    home.loadYahoo("headlines");
                }else{
                    home.loadYahoo(lasedTag);
                }
                return;
            }
            
             
            this.loadApiOrgArticle_default(savedState);
        }
         

    },
    mounted(){
        this.$on('test', function (msg) {
            console.log(msg)
        })
        // <ActionItetem @tap="refreshNewsSource" android.systemIcon="ic_menu_refresh" android.position="actionBar" text="Sources"></ActionItetem>

    }
    ,
    template:
    `    
    <ActionBar height="250px" background="#CF4B4B" color="white" flat="true" :title="title">
      </ActionBar>
 

    `
}