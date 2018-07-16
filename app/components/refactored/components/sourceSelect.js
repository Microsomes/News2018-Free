const httpModule = require("http");


module.exports={
    data(){
        return {
            title:"Newsify",
            currentSourceSelectedValue:0,
            currentSouceSelected:'All Sources',
            sourceCategores:["All Sources", "technology","Liveuamap","Reddit","conspiracies","business", "entertainment", "general", "health", "science", "sports"],
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
            var apiLink="http://178.128.40.186/news/sources/"+sources;
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

            switch(this.sourceCategores[value.value]){
                case "All Sources":
                this.allSources();
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
            this.grabApiOrgNewsSouces("everything");
           
        },
        souceClicked(e){

            if(this.currentSouceSelected=="Liveuamap"){
                //handle liveuamp source loading a bit differently
                return;
            }
            if(this.currentSouceSelected=="Reddit"){
                //handle Reddit source loading a bit differently
                return;
            }
            if(this.currentSouceSelected=="conspiracies"){
                //handle conspiracies source loading a bit differently
                return;
            }

            //a source has been clicked on
            var str = e.item;
            var fixed = str.replace(/\s+/g, '-').toLowerCase();
            console.log(fixed); // "sonic-free-games";

            this.$modal.close({
                source:fixed,
                filer:true,
                type:"apiorg"
            });


        }
    },
    created(){
        //loading all souces
        console.log("all");
        var home=this;
        setTimeout(()=>{
            this.allSources();
        },1000)
         
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

    <ActivityIndicator v-if="isLoading" :busy="isLoading" />



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