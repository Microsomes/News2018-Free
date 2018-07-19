const httpModule = require("http");
const SERVER_IP="192.168.0.54";
const applicationSettings = require("application-settings");



module.exports={
    data(){
        return {
            title:"Newsify",
            currentSourceSelectedValue:0,
            currentSouceSelected:'All Sources',
            sourceCategores:["yahoo","Telegraph","technology","Liveuamap","Reddit","conspiracies","business", "entertainment", "general", "health", "science", "sports"],
            sources:[],
            isLoading:false
        }
    },
    methods:{
        grabApiOrgNewsSouces(sources){
            this.isLoading=true;
            var home=this;
            if(sources){
                console.log("requesting"+sources);
            var apiLink="http://"+SERVER_IP+"/news/sources/"+sources;
            httpModule.getJSON(apiLink).then((r) => {
                home.isLoading=false;
                var sources= r["sources"];
                var tots= r["totalResults"];
                 
                for(var i=0;i<tots;i++){
                    var name= sources[i]["name"];
                    home.sources.push(
                        name
                    )
                }


            }, (e) => {
                console.log(e);
            });


            }
            return;
            


        },
        handleTabSelector(value){
            console.log(value.value);
            console.log(this.sourceCategores[value.value]);
            this.currentSouceSelected=this.sourceCategores[value.value];
            this.sources=[];

            applicationSettings.setString("lastSelectedSource",this.currentSouceSelected);
            //lastSelectedSource

            switch(this.sourceCategores[value.value]){
                case "yahoo":
                this.grabApiOrgNewsSouces("yahoo");
                break;
                case "Telegraph":
                this.grabApiOrgNewsSouces("telegraph");
                break;
                case "business":
                this.grabApiOrgNewsSouces("business");
                break;
                case "entertainment":
                this.grabApiOrgNewsSouces("entertainment");
                break;
                case "general":
                this.grabApiOrgNewsSouces("general");
                break;
                case "health":
                this.grabApiOrgNewsSouces("health");
                break;
                case "science":
                this.grabApiOrgNewsSouces("science");
                break;
                case "sports":
                this.grabApiOrgNewsSouces("sports");
                break;
                case "technology":
                this.grabApiOrgNewsSouces("technology");
                break;
                case "Reddit":
                this.grabApiOrgNewsSouces("reddit");
                break;
                case "Liveuamap":
                this.grabApiOrgNewsSouces("liveuamap");
                break;
                case "conspiracies":
                this.grabApiOrgNewsSouces("conspiracies");
                break;

                default:
                this.grabApiOrgNewsSouces("entertainment")
            }
            
        },
        allSources(){
            //load all sources
            this.grabApiOrgNewsSouces("yahoo");
            this.currentSouceSelected="yahoo";
           
        },
        souceClicked(e){
            var home=this;
            //this.$emit("loadProcess","loading");

            if(this.currentSouceSelected=="yahoo"){
                let tag= e.item;
                  this.$modal.close({
                      source:tag,
                      filer:false,
                      type:"yahoo"
                  });
                return;
            }

            if(this.currentSouceSelected=="Telegraph"){
                //handle this source slightly differetly
                let tag= e.item;
                //tag
                  this.$modal.close({
                      source:tag,
                      filer:false,
                      type:"telegraph"
                  });

                return;
            }


            if(this.currentSouceSelected=="Liveuamap"){
                //handle liveuamp source loading a bit differently

                let tag= e.item;
                //tag
                this.$modal.close({
                    source:tag,
                    filer:false,
                    type:"liveuamp"
                });



                return;
            }
            if(this.currentSouceSelected=="Reddit"){
                //handle Reddit source loading a bit differently
                let tag= e.item;
                //tag
                this.$modal.close({
                    source:tag,
                    filer:false,
                    type:"reddit"
                });
                return;
            }
            if(this.currentSouceSelected=="conspiracies"){
                //handle conspiracies source loading a bit differently
                console.log("handling conspiracies");
                let tag= e.item;
                //tag
                this.$modal.close({
                    source:tag,
                    filer:false,
                    type:"cons"
                });
                return;
            }

            //a source has been clicked on
            var str = e.item;
            var fixed = str.replace(/\s+/g, '-').toLowerCase();
            console.log(fixed); // "sonic-free-games";
            console.log("standard source selected");
            this.$modal.close({
                source:fixed,
                filer:true,
                type:"apiorg"
            });


        }
    },
    created(){
        var home=this;
        var savedState= applicationSettings.getString("lastSelectedSource");
        if(savedState!=null && savedState!=undefined){
            console.log("last----");
            console.log(savedState);
            if(savedState=="All Sources"){
                return;
            }
            home.sourceCategores.unshift(savedState);

            if(savedState=="Liveuamap"){
                this.grabApiOrgNewsSouces("liveuamap");
                home.currentSouceSelected="Liveuamap";

            }else if(savedState=="Reddit"){
                this.grabApiOrgNewsSouces("reddit");
                home.currentSouceSelected="Reddit";
            }else if(savedState=="Telegraph"){
                this.grabApiOrgNewsSouces("telegraph");
                home.currentSouceSelected="Telegraph";
            }
            else{
            this.grabApiOrgNewsSouces(savedState);
            home.currentSouceSelected=savedState;
            }
            console.log("adding to source categories");
        }else{
            this.allSources();

        }
         
       
         
     }
    ,
    template:
    `
    <Page>
     <StackLayout width="100%" height="100%">

    <StackLayout class="source_selector_hint" height="200px" >
        <Label text="pick a source"></Label>
        <Label :text="currentSouceSelected"></Label>
    </StackLayout>

    <ScrollView orientation="horizontal">

        <SegmentedBar selectedIndex="0" @selectedIndexChange="handleTabSelector" v-model="currentSourceSelectedValue" selectedBackgroundColor="#787878">
        <SegmentedBarItem v-for="n in sourceCategores" :title="n" />
         </SegmentedBar>

    </ScrollView>

    <ActivityIndicator color="#CE4947" v-if="isLoading" :busy="isLoading" />



    <ListView @itemTap="souceClicked" height="100%" for="item in sources" >
    <v-template>
    <StackLayout padding="10px" orientation="horizontal">
        <!-- Shows the list item label in the default color and stye. -->
        <FlexboxLayout flexDirection="row" alignItems="center" justifyContent="center" class="circle">
            <Label class="souce_select_circle_text" :text="item[0]"></Label>
        </FlexboxLayout>

         <Label  class="verticleAlign_source_select" :text="item" />
    </StackLayout>
    </v-template>
    </ListView>
    
    </StackLayout>
 
    </Page>
 

    `
}