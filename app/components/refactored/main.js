
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

const exit = require('nativescript-exit').exit;


console.log('min(3, 4) = ', java.lang.Math.min(3, 4));


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
            this.feedback="no articles related to the tag selected";
            this.showFeedback=true;
            //show the feedback message to the user
            console.log("showing no data ");
        },
        tagSe(data){
            this.$refs.header_comp.loadApiOrgArticle_tag(data);
            this.isLoading=true;
        },
        openNews(args){
             this.$showModal(articleReader,{ context: { propsData: { url:args.item.url,title:args.item.title}}});

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
 
    }
    ,
    template:
    `
    <Page ref="myPage" class="page">  
    
    <header ref="header_comp"  @show_article_is_loading="show_loading_article" @articles_error="show_no_data" @articlesLoad="articlesLoad"></header>
 
    <StackLayout>

    <tagSelector @test="tagSe" v-if="isTagSelector"></tagSelector>

    <ActivityIndicator v-if="isLoading" :busy="isLoading" />

    <Label  v-show="showFeedback"  :text="feedback"></Label>
    
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