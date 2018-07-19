
const header= require("./components/header");
//header module
const tagSelector= require("./components/tagSelector");
//tag selector
const articleView= require("./components/articlesview");
const httpModule = require("http");
var Moments= require("moment");
var nstoasts = require("nativescript-toasts");

const articleReader= require("./../articleReader");
const application = require("tns-core-modules/application");

const not_connected_page= require("./pages/notConnected");
 

const exit = require('nativescript-exit').exit;


console.log('min(3, 4) = ', java.lang.Math.min(3, 4));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


module.exports={
    data(){
        return {
            isTagSelector:true,
            articles:[],
            isLoading:true,
            feedback:"",
            showFeedback:false
        }
    },
    methods:{
        async  showLoadingState(){
            
        var options = {
            text: "loading the news this could take a while",
            duration : nstoasts.DURATION.LONG,
            position : nstoasts.POSITION.BOTTOM //optional
        }
        nstoasts.show(options);
            
            // this.articles=[];
            // this.isLoading=true;
            // this.feedback="";
            // this.showFeedback=true;
            sleep(500);
            this.articles=[];
        },
       async parse_article_cons(data){
            this.isLoading=true;
            this.showFeedback=true;
            this.articles=[];
            this.feedback="loading data from socialstation.io and parsing it. This may take a few seconds";
            await sleep(1000);
            console.log("parsing now");
            this.showFeedback=false;
            this.isLoading=false;
            this.articles=[];


            console.log(data);
            this.$refs.header_comp.changeTitle("-Cons");
            var home=this;
            var articles= data["articles"];
            var tots= data["totalResults"];
            
            for(var i=0;i<tots;i++){
                var curArticle= articles[i];
                var curTitle= curArticle["title"];
                var curAuthor= curArticle["author"];
                var curPublishedAt= curArticle["publishedAt"];
                var tt= Moments(curPublishedAt).fromNow();
                var curUrl= curArticle["url"];
                var urlToImg= curArticle["urlToImage"];
                home.articles.push({
                   image:urlToImg,
                   title:curTitle,
                   source:curAuthor,
                   tt:tt,
                   url:curUrl
               })
           }

        },
       async  parse_article_telegraph(data){
            this.isLoading=true;
            this.showFeedback=true;
            this.articles=[];
            this.feedback="loading data from telegraph.com and parsing it. This may take a few seconds";
            await sleep(1000);
            console.log("parsing now");
            this.showFeedback=false;
            this.isLoading=false;
            this.articles=[];


            console.log(data);
            this.$refs.header_comp.changeTitle("-Yahoo");
            var home=this;
            var articles= data["articles"];
            var tots= data["totalResults"];
            
            for(var i=0;i<tots;i++){
                var curArticle= articles[i];
                var curTitle= curArticle["title"];
                var curAuthor= curArticle["author"];
                var curPublishedAt= curArticle["publishedAt"];
                var tt= Moments(curPublishedAt).fromNow();
                var curUrl= curArticle["link"];
                var urlToImg= curArticle["urlToImage"];
                home.articles.push({
                   image:urlToImg,
                   title:curTitle,
                   source:curAuthor,
                   tt:tt,
                   url:curUrl
               })
           }


        },
        async parse_article_yahoo(data){
            this.isLoading=true;
            this.showFeedback=true;
            this.articles=[];
            this.feedback="loading data from yahoo.com and parsing it. This may take a few seconds";
            await sleep(1000);
            console.log("parsing now");
            this.showFeedback=false;
            this.isLoading=false;
            this.articles=[];


            console.log(data);
            this.$refs.header_comp.changeTitle("-Yahoo");
            var home=this;
            var articles= data["articles"];
            var tots= data["totalResults"];
            
            for(var i=0;i<tots;i++){
                var curArticle= articles[i];
                var curTitle= curArticle["title"];
                var curAuthor= curArticle["author"];
                var curPublishedAt= curArticle["publishedAt"];
                //var tt= Moments(curPublishedAt).fromNow();
                var curUrl= curArticle["url"];
                var urlToImg= curArticle["urlToImage"];
                home.articles.push({
                   image:urlToImg,
                   title:curTitle,
                   source:"Yahoo",
                   tt:curPublishedAt,
                   url:curUrl
               })
           }


        },
        async parse_article_reddit(data){
            this.$refs.header_comp.changeTitle("-reddit");
            this.isLoading=true;
            this.showFeedback=true;
            this.articles=[];
            this.feedback="loading data from reddit.com and parsing it";
            await sleep(1000);
            console.log("parsing now");
            this.showFeedback=false;
            this.isLoading=false;
              this.articles=[];

               var home=this;
             console.log("---");
             var articles= data["articles"];
             var tots= data["totalResults"];

             for(var i=0;i<tots;i++){
             var curArticle= articles[i];
             var curTitle= curArticle["title"];
             var curAuthor= curArticle["author"];
             var curPublishedAt= curArticle["publishedAt"];
             var tt= Moments(curPublishedAt).fromNow();
             var curUrl= curArticle["url"];
             var urlToImg= curArticle["urlToImg"];
             home.articles.push({
                image:urlToImg,
                title:curTitle,
                source:curAuthor,
                tt:tt,
                url:curUrl
            })
        }

            
 
        },
        show_loading_article(){
            this.isLoading=true;
            this.showFeedback=true;
            this.feedback="grabbing news...";
            this.articles=[];
            //clear the articles
        },
        show_no_data(){
            //this method handles the ui when no data is returned by the api
            this.isLoading=false;
            //turn loading off
            this.articles=[];
            //remove all articles
            this.feedback="no articles found. Please try another tag or alternatively add your own";
            this.showFeedback=true;
            //show the feedback message to the user
            console.log("showing no data ");
        },
        tagSe(data){
            this.$refs.header_comp.loadApiOrgArticle_tag(data);
            this.isLoading=true;
            this.articles=[];
        },
        openNews(args){
             this.$showModal(articleReader,{ context: { propsData: { url:args.item.url,title:args.item.title}}});

        },
        filter_change(data){
            //handles turning the filter off or on
            if(data=="off"){
                console.log("turning filter off now");
                this.isTagSelector=false;
                //call to close 
            }else{
                console.log("turning filter back on now");
                this.isTagSelector=true;

            }
        },
        async articlesLoad_live(data){
            this.$refs.header_comp.changeTitle("-maeplet");

            this.isLoading=true;
            this.showFeedback=true;
            this.articles=[];
            this.feedback="loading data from liveuamap.com and parsing it";
            await sleep(1000);
             this.showFeedback=false;
            this.isLoading=true;
              this.articles=[];
               var home=this;
             console.log("---");
             var articles= data["articles"];
             var tots= data["totalResults"];
             for(var i=0;i<=tots;i++){

                if(tots==i){
                    this.isLoading=false;
                }
                  
             var cur= articles[i];
             var cur_author= cur["author"] || "Chris Mahat";
             var cur_description= cur["description"] || "---";
             var cur_publishedAt= cur["publishedAt"];
              

             var cur_source= cur["source"].name || "Microsomesapi";
             var cur_title= cur["title"];
             var cur_url= cur["url"];
             var cur_url_to_image= cur["urlToImage"] || "http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg";
              home.articles.push({
                image:cur_url_to_image,
                title:cur_title,
                source:cur_source,
                tt:cur_publishedAt,
                url:cur_url
            })
        }


        var options = {
            text: "data loaded please scroll up to see recents",
            duration : nstoasts.DURATION.LONG,
            position : nstoasts.POSITION.BOTTOM //optional
        }
        nstoasts.show(options);

        },
        articlesLoad(data){
            this.showFeedback=false;
            this.isLoading=true;
              this.articles=[];
               var home=this;
             console.log("---");
             var articles= data["articles"];
             var tots= data["totalResults"];
             for(var i=0;i<=tots;i++){

                if(tots==i){
                    this.isLoading=false;
                }
                  
             var cur= articles[i];
             var cur_author= cur["author"] || "Chris Mahat";
             var cur_description= cur["description"] || "---";
             var cur_publishedAt= cur["publishedAt"];
             var tt= Moments(cur_publishedAt).fromNow(); 

             var cur_source= cur["source"].name || "Microsomesapi";
             var cur_title= cur["title"];
             var cur_url= cur["url"];
             var cur_url_to_image= cur["urlToImage"] || "http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg";
              home.articles.push({
                image:cur_url_to_image,
                title:cur_title,
                source:cur_source,
                tt:tt,
                url:cur_url
            })
        }


        var options = {
            text: "data loaded please scroll up to see recents",
            duration : nstoasts.DURATION.LONG,
            position : nstoasts.POSITION.BOTTOM //optional
        }
        nstoasts.show(options);
 


       
        
       
   
         }
    }
    ,
    updated(){
  
         
     },
    mounted(){
        
        application.on(application.suspendEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                exit();
                //close application when suspended
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
 
    },
    created(){
        httpModule.getString("https://httpbin.org/get").then((r) => {
            console.log("connected");
         }, (e) => {
             //user is not connected to the internet
            console.log("not connected to the internet");
            this.$navigateTo(not_connected_page);

        });

    }
    ,
    template:
    `
    <Page ref="myPage" class="page">  
    
    <header @parse_article_cons="parse_article_cons" @parse_article_telegraph="parse_article_telegraph" @showLoadingState="showLoadingState" @parse_article_yahoo="parse_article_yahoo" @parse_article_reddit="parse_article_reddit" ref="header_comp" @articlesLoad_live="articlesLoad_live" @filter_change="filter_change"  @show_article_is_loading="show_loading_article" @articles_error="show_no_data" @articlesLoad="articlesLoad"></header>
 
    <StackLayout>

    <tagSelector ref="tag_comp" @test="tagSe" v-if="isTagSelector"></tagSelector>

    <ActivityIndicator color="#CE4947" v-if="isLoading" :busy="isLoading" />

    <Label textWrap="true" class="errorMessage"  v-show="showFeedback"  :text="feedback"></Label>
    
    <ScrollView   ref="main_scroll"  id="myScroller">
    <ListView  @itemTap="openNews" ref="main_list_view"   height="100%" for="n in articles"     >
      <v-template>
         <StackLayout>
            <StackLayout class="newsItemImage">
            <Image stretch="fill" width="100%" :src="n.image" />
            </StackLayout>
            <StackLayout class="newsItemTitle">
                <Label textWrap="true" :text="n.title"></Label>
            </StackLayout>
            <StackLayout orientation="Horizontal" class="newsItemMetric">
            <Label class="metric" :text="n.source"></Label>
            <Label class="metric" :text="n.tt"></Label>
            </StackLayout>
        </StackLayout>
      </v-template>
    </ListView>
    </ScrollView>
 
      
    </StackLayout>
    
  </Page>



    `,
    components:{
        header,
        tagSelector
    }
}