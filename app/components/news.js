 
 var okHttp = require("nativescript-okhttp");

 var Moments= require("moment");
 var nstoasts = require("nativescript-toasts");
//for toasts
 
const articleReader= require("./articleReader");

const main= {
  data() {
    return {
        bottomMenu:[
            {
                text:'Home',
                image:'https://png.pngtree.com/element_pic/00/16/07/165789984e908db.jpg',
                col:"#C94446",
                textcol:"white"
            },
            {
                text:'Conspiracies',
                image:'https://png.pngtree.com/element_pic/00/16/07/165789984e908db.jpg',
                col:"white"
            },
            {
                text:'Premium',
                image:'https://png.pngtree.com/element_pic/00/16/07/165789984e908db.jpg',
                col:"white"
            }
        ],
        listOfItems:[
            "one",
            "two",
            "three",
            "four",
            "one",
            "two",
            "three",
            "four"
        ],
    appName:'News Research Apps',
      source:'bbc-news',
      tag:'topHeadlines',
      tagFilerrs:[
          "Headlines",
          "Bitcoin",
          "Politics"
      ],
      sourcesList:[
           "pick a source",
      ],
      sourceListv1:[
        "pick a source",
      ]
      ,
      articles:[
         
      ]
    };
  },
  methods:{
    SourceSelected(evt){
         var source= this.sourceListv1[evt.value];
         this.loadNewsArticles(source,"topHeadlines");
         //calls method to load news articles
    },
    openConspiracies(which){
        var whi=null;

        //reset menu state
        this.bottomMenu[0].col="white";
        this.bottomMenu[1].col="white";
        this.bottomMenu[2].col="white";

        this.bottomMenu[0].textcol="black";
        this.bottomMenu[1].textcol="black";
        this.bottomMenu[2].textcol="black";

        switch(which){
            case "Conspiracies":
            //open conspiracies
            whi="Conspiracies coming this Friday 13/07/18 "
            this.bottomMenu[1].col="#C94446";
            this.bottomMenu[1].textcol="white";
            break;
            case "Home":
            whi="Already home";
            this.bottomMenu[0].col="#C94446";
            this.bottomMenu[0].textcol="white";
            break;
            case "Premium":
            whi="premium coming soon"
            this.bottomMenu[2].col="#C94446";
            this.bottomMenu[2].textcol="white";
            break;
        }
        //method opens conspiracies
        var options = {
            text: whi,
            duration : nstoasts.DURATION.SHORT,
            position : nstoasts.POSITION.BOTTOM //optional
        }
        nstoasts.show(options);
    },
    openNews(args){
        //opens news in a modal
        this.$showModal(articleReader,{ context: { propsData: { url:args.item.url}}});

     },
     openSourceDialog(){
         var home=this;
         //opens source selector menu
                    action("Pick a news source", "Wait, Cancel", this.sourceListv1)
            .then(result => {
                if(result=="pick a source"){
                    return;
                }
                if(result=="Wait, Cancel"){
                    return;
                }
                home.loadNewsArticles(result,home.tag);
                //load top headlines
                home.source=result;
                //save source
                
            });
     },
    grabAllSources(){
        //connects to the newsapi org to grab a list of source
       var home=this;
        var result = okHttp.getString("https://newsapi.org/v2/sources?apiKey=df7b47e4a44a4ba0906e82f0e4c2b6bc");
        var resultJson= JSON.parse(result);
        var tots=  resultJson["sources"].length;

        for(var i=0;i<tots;i++){
            let currentSource= resultJson["sources"][i];
            let curName= currentSource.name;
            let curID= currentSource.id;
            home.sourcesList.push(curName);
            home.sourceListv1.push(curID);
  
        }

    },
    selectedTag(tag){
        var home=this;
        var finalTag='';
        switch(tag.value){
            case 0:
            finalTag="topHeadlines";
            break;
            case 1:
            finalTag="Bitcoin";
            break;
            case 2:
            finalTag="Politics";
            break;
        }
        this.loadNewsArticles(home.source,finalTag);
        //send command to load the damn news
        home.tag=finalTag;
    },
    refreshNews(){
        //method refreshes news
        this.loadNewsArticles(this.source,this.tag);
        var options = {
            text: "Refreshed",
            duration : nstoasts.DURATION.SHORT,
            position : nstoasts.POSITION.BOTTOM //optional
        }
        nstoasts.show(options);
    },
    loadNewsArticles(source,tag){
        console.log("loading news artice");
        console.log(source);
        var home=this;
        if(source=="pick a source"){
            return;
        }
        this.articles=[];
        //clear current articles before loading more in
        var apiReqLink=null;//determined by the tag

        switch(tag){
            case "topHeadlines":
            //parse data related to top headline  
            apiReqLink="https://newsapi.org/v2/top-headlines?apiKey=df7b47e4a44a4ba0906e82f0e4c2b6bc&sources="+source;
            break;
            case "Bitcoin":
            apiReqLink="https://newsapi.org/v2/everything?q=bitcoin&apiKey=df7b47e4a44a4ba0906e82f0e4c2b6bc&sources="+source;
            break;
            case "Politics":
            apiReqLink="https://newsapi.org/v2/everything?q=politics&from=2018-07-11&apiKey=df7b47e4a44a4ba0906e82f0e4c2b6bc&sources="+source;
            break;
        }

        
        if(apiReqLink!=null){
            //execute and parse
            var result = okHttp.getString(apiReqLink);
            var resultJson= JSON.parse(result);
            var tots=  resultJson["articles"].length;
            
            var articlesArr= resultJson["articles"];

            for(var i=0;i<tots;i++){
                var curArticle= articlesArr[i];

                var curtitle= curArticle["title"];
                var curdescription= curArticle["description"] || "";
                var cururl= curArticle["url"]; 
                var curImage= curArticle["urlToImage"] || "http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg";
                var curPublishedAt= curArticle["publishedAt"];
                var curAuthor= curArticle["author"] || "Chris Mahatman";
                var curSource=  curArticle["source"].name || "News";
                var tt= Moments(curPublishedAt).fromNow(); 
                 
                home.articles.push({
                    title:curtitle,
                    image:curImage,
                    source:curSource,
                    url:cururl,
                    tt,
                })
            }
            
            
            

        }
        
        
    }
  },
  created(){
    this.grabAllSources();
    this.loadNewsArticles(this.source,this.tag);

  },
  template: `
    <Page class="page"
     >
       
    <ActionBar flat="true" title="The News Research App">
    
  
    <ActionItem @tap="openSourceDialog" text="sources"></ActionItem>

    <ActionItem @tap="refreshNews" android.systemIcon="ic_menu_refresh"></ActionItem>
    </ActionBar>
 
  
      <StackLayout>

     
         
      <SegmentedBar selectedIndex="0"      @selectedIndexChange="selectedTag" selectedBackgroundColor="#787878" backgroundColor="grey" class="sourceTagFilters">
      <SegmentedBarItem title="Headlines" />
      <SegmentedBarItem title="Bitcoin" />
      <SegmentedBarItem title="Politics" />
    </SegmentedBar>

    <ScrollView>
    <ListView @itemTap="openNews" height="90%"  for="n in articles" >
      <v-template>
         <StackLayout>
            <StackLayout class="newsItemImage">
            <Image :src="n.image" />
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

    
    <DockLayout width="100%" height="15%"   stretchLastChild="false">
    
    <StackLayout text="bottom" dock="bottom" height="61"  >
        <FlexboxLayout flexDirection="row" width="100%" height="100%"  >
        
        <FlexboxLayout v-for="n in bottomMenu"  width="33.3%" height="100%"  flexDirection="column" justifyContent="center" alignItems="center">
         <Button @tap="openConspiracies(n.text)" :color="n.textcol" :background="n.col" style="font-size:13px" height="100%" width="100%" :text="n.text"></Button>
        </FlexboxLayout>

        
 
     </FlexboxLayout>
    </StackLayout>
  </DockLayout>
            
 
      </StackLayout>
 
    </Page>
  `,
  components: {
   },
};

module.exports= main;